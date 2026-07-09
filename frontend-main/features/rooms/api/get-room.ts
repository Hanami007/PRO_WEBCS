import { api } from "@/lib/api-client";
import { Room } from "../types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "@/lib/react-query";

export const getRoom = ({
  roomId,
}: {
  roomId: string;
}): Promise<Room> => {
  return api.get(`/rooms/${roomId}`);
};

export const getRoomQueryOptions = (roomId: string) => {
  return queryOptions({
    queryKey: ["rooms", roomId],
    queryFn: () => getRoom({ roomId }),
  });
};

type UseRoomOptions = {
  roomId: string;
  queryConfig?: QueryConfig<typeof getRoomQueryOptions>;
};

export const useRoom = ({
  roomId,
  queryConfig,
}: UseRoomOptions) => {
  return useQuery({
    ...getRoomQueryOptions(roomId),
    ...queryConfig,
  });
};
