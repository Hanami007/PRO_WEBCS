import { FormPassword } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { changePasswordInputSchema, useChangePassword } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type ChangePasswordFormProps = {
  onSuccess: () => void;
};

const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const form = useForm<z.infer<typeof changePasswordInputSchema>>({
    resolver: zodResolver(changePasswordInputSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const changePassword = useChangePassword({
    onSuccess,
  });

  const onSubmit = (values: z.infer<typeof changePasswordInputSchema>) => {
    changePassword.mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Password</FieldLegend>
          <FieldDescription>Update contact information.</FieldDescription>

          <FormPassword
            control={form.control}
            name="currentPassword"
            label="Current Password"
          />

          <FormPassword
            control={form.control}
            name="newPassword"
            label="New Password"
          />

          <FormPassword
            control={form.control}
            name="confirmNewPassword"
            label="Confirm Password"
          />
          <Field orientation="horizontal">
            <Button type="submit">Update</Button>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordForm;
