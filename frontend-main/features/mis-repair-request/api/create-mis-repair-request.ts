import { api } from "@/lib/api-client";
import z from "zod";
import { MisRepairRequest } from "../types/api";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { FileEntity } from "@/types/api";
import { PUBLIC_ACCEPTED_FILE_TYPES, PUBLIC_MAX_FILE_SIZE, uploadFilePublic } from "@/features/files/api/upload-file-public";

export const createMisRepairRequestInputSchema = z.object({
  reporterName: z.string().min(2, "กรุณากรอกชื่อผู้แจ้ง"),
  location: z.string().min(2, "กรุณาระบุสถานที่"),
  itemName: z.string().min(2, "กรุณาระบุชื่ออุปกรณ์"),
  description: z.string().min(10, "กรุณาระบุรายละเอียดอย่างน้อย 10 ตัวอักษร"),
  image: z.custom<FileEntity>().optional(),
  file: z.file().mime(PUBLIC_ACCEPTED_FILE_TYPES, "ไม่รองรับประเภทไฟล์นี้").max(PUBLIC_MAX_FILE_SIZE, "ไฟล์ต้องไม่เกิน 3MB").optional(),
});

export type CreateMisRepairRequestInput = z.infer<typeof createMisRepairRequestInputSchema>;
export type CreateMisRepairRequestApiData = Omit<CreateMisRepairRequestInput, "file">;

export const createMisRepairRequest = ({ data }: { data: CreateMisRepairRequestApiData }): Promise<MisRepairRequest> =>
  api.post("/mis-repair-request", data);

type UseOptions = { mutationConfig?: MutationConfig<typeof createMisRepairRequest> };
type CreateArgs = { data: CreateMisRepairRequestApiData; file?: File | null };

export const useCreateMisRepairRequest = ({ mutationConfig }: UseOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    ...restConfig,
    mutationFn: async ({ data, file }: CreateArgs) => {
      let uploadedImage: FileEntity | undefined = undefined;
      if (file) {
        uploadedImage = await uploadFilePublic({ file, prefix: "mis-repair-request" });
      }
      const payload = uploadedImage ? { ...data, image: uploadedImage } : data;
      return createMisRepairRequest({ data: payload });
    },
    onSuccess: (...args) => { onSuccess?.(...args); },
  });
};
