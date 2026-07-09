import { Building } from 'src/buildings/entities/building.entity';
import { Personnel } from 'src/personnel/entities/personnel.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { File } from 'src/files/entities/file.entity';

export async function migrateRoom(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting rooms migration');

  const oldRooms = await oldDb.query('SELECT * FROM rooms');
  const oldPersonnels = await oldDb.query('SELECT id, name_en FROM personnels');
  const oldBuildings = await oldDb.query('SELECT id, building FROM buildings');
  const oldRoomTypes = await oldDb.query('SELECT * FROM type_rooms');

  const newRoomRepo = newDb.getRepository(Room);
  const personnelRepo = newDb.getRepository(Personnel);
  const buildingRepo = newDb.getRepository(Building);
  const roomTypeRepo = newDb.getRepository(RoomType);
  const fileRepo = newDb.getRepository(File);

  const newPersonnels = await personnelRepo.find();
  const newBuildings = await buildingRepo.find();
  const newRoomTypes = await roomTypeRepo.find();

  const oldPersIdToName = new Map<number, string>();
  oldPersonnels.forEach(
    (p) => p.name_en && oldPersIdToName.set(p.id, p.name_en.trim()),
  );

  const oldBuildIdToName = new Map<number, string>();
  oldBuildings.forEach(
    (b) => b.building && oldBuildIdToName.set(b.id, b.building.trim()),
  );

  const oldTypeIdToName = new Map<number, string>();
  oldRoomTypes.forEach(
    (t) => t.type_room && oldTypeIdToName.set(t.id, t.type_room.trim()),
  );

  const newNameToPers = new Map<string, Personnel>();
  newPersonnels.forEach(
    (p) => p.fullnameEn && newNameToPers.set(p.fullnameEn.trim(), p),
  );

  const newNameToBuild = new Map<string, Building>();
  newBuildings.forEach((b) => b.name && newNameToBuild.set(b.name.trim(), b));

  const newNameToType = new Map<string, RoomType>();
  newRoomTypes.forEach((t) => t.name && newNameToType.set(t.name.trim(), t));

  const resolveEntity = <T>(
    oldId: number,
    idToNameMap: Map<number, string>,
    nameToEntityMap: Map<string, T>,
  ): T | null => {
    if (!oldId) return null;
    const name = idToNameMap.get(oldId);
    if (!name) return null;
    return nameToEntityMap.get(name) || null;
  };

  for (const oldRoom of oldRooms) {
    const personnelEntity = resolveEntity(
      oldRoom.personnel_id,
      oldPersIdToName,
      newNameToPers,
    );
    const buildingEntity = resolveEntity(
      oldRoom.building_id,
      oldBuildIdToName,
      newNameToBuild,
    );
    const typeEntity = resolveEntity(
      oldRoom.type_room_id,
      oldTypeIdToName,
      newNameToType,
    );

    let newFile: File | undefined = undefined;

    // Check if image exists and is not just an empty string
    if (oldRoom.image) {
      newFile = fileRepo.create({
        path: path.join('files', 'rooms', oldRoom.image),
      });
      await fileRepo.save(newFile);
    }

    const newRoom = newRoomRepo.create({
      code: oldRoom.room_id,
      nameTh: oldRoom.room_name_th,
      nameEn: oldRoom.room_name_en,
      personnel: personnelEntity || undefined,
      building: buildingEntity || undefined,
      floor: oldRoom.floor,
      image: newFile ?? undefined,
      capacity: oldRoom.amount_seat,
      type: typeEntity || undefined,
      createdAt: oldRoom.created_at || new Date(),
      updatedAt: oldRoom.updated_at || new Date(),
      deletedAt: oldRoom.is_del ? new Date() : undefined,
    });
    await newRoomRepo.save(newRoom);
  }
  console.log('Rooms Migration Complete');
}
