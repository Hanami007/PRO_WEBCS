import {
  CreateComplainInput,
  createComplainInputSchema,
  useCreateComplain,
} from "../api/create-complain";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormFile,
  FormImagePreview,
  FormInput,
  FormTextarea,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import useFilePreview from "@/hooks/use-file-preview";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";

export const CreateComplain = () => {
  const createComplainMutation = useCreateComplain();

  const form = useForm<CreateComplainInput>({
    resolver: zodResolver(createComplainInputSchema),
    defaultValues: {
      title: "",
      detail: "",
      file: undefined,
    },
  });

  const file = form.watch("file");
  const [filePreview] = useFilePreview(file ?? null);

  const onSubmit = (values: CreateComplainInput) => {
    const { file, ...data } = values;
    createComplainMutation.mutate(
      { data, file },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col space-y-8 items-center">
        <h2 className="text-2xl font-semibold">แจ้งปัญหา / ข้อเสนอแนะ</h2>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <FieldSet>
            <FormInput
              control={form.control}
              name="title"
              label="หัวข้อเรื่อง"
            />

            <FormTextarea
              control={form.control}
              name="detail"
              label="รายละเอียด"
            />

            <FormImagePreview file={filePreview} />

            <FormFile
              control={form.control}
              name="file"
              label="อัพโหลดรูปภาพ (ถ้ามี)"
            />

            <Field>
              <Button
                type="submit"
                className="w-full"
                disabled={createComplainMutation.isPending}
              >
                Send Message
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </section>
  );
};
