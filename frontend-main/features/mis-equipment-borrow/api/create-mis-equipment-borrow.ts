import { api } from "@/lib/api-client";
import z from "zod";
import { MisEquipmentBorrow } from "../types/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export const createMisEquipmentBorrowInputSchema = z.object({
  borrowerName: z.string().min(2, "กรุณากรอกชื่อผู้ยืม"),
  equipmentName: z.string().min(2, "กรุณากรอกชื่ออุปกรณ์"),
  quantity: z.number().min(1, "จำนวนต้องมากกว่า 0"),
  borrowDate: z.string().min(1, "กรุณาเลือกวันที่ยืม"),
  returnDate: z.string().optional(),
  note: z.string().optional(),
});

export type CreateMisEquipmentBorrowInput = z.infer<typeof createMisEquipmentBorrowInputSchema>;

export const createMisEquipmentBorrow = ({
  data,
}: {
  data: CreateMisEquipmentBorrowInput;
}): Promise<MisEquipmentBorrow> => {
  return api.post("/mis-equipment-borrow", data);
};

type UseOptions = {
  mutationConfig?: MutationConfig<typeof createMisEquipmentBorrow>;
};

export const useCreateMisEquipmentBorrow = ({ mutationConfig }: UseOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: createMisEquipmentBorrow,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
  });
};
