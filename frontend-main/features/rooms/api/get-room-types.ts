import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export type RoomType = {
  id: string;
  name: string;
  description: string;
};

export const getRoomTypes = (): Promise<RoomType[]> => {
  return api.get("/room-type");
};

export const useRoomTypes = () => {
  return useQuery({
    queryKey: ["room-types"],
    queryFn: getRoomTypes,
  });
};
