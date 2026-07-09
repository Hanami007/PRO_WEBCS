"use client";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { ReactNode, useEffect, useMemo } from "react";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label?: ReactNode;
  description?: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      "aria-invalid": boolean;
      id: string;
    },
  ) => ReactNode;
};

type FormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps,
) => ReactNode;

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = label && (
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </FieldContent>
        );

        const descriptionElement = description && (
          <FieldDescription>{description}</FieldDescription>
        );

        const control = children({
          ...field,
          id: field.name,
          "aria-invalid": fieldState.invalid,
        });
        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? "horizontal" : undefined}
          >
            {controlFirst ? (
              <>
                {control}
                {labelElement}
                {errorElem}
                {descriptionElement}
              </>
            ) : (
              <>
                {labelElement}
                {control}
                {errorElem}
                {descriptionElement}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}

export const FormInput: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Input {...field} />}</FormBase>;
};

export const FormTextarea: FormControlFunc = (props) => {
  return <FormBase {...props}>{(field) => <Textarea {...field} />}</FormBase>;
};

export const FormSelect: FormControlFunc<{ children: ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={field["aria-invalid"]}
            id={field.id}
            onBlur={onBlur}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  );
};

export const FormCheckbox: FormControlFunc = (props) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox {...field} checked={value} onCheckedChange={onChange} />
      )}
    </FormBase>
  );
};

export const FormNumber: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {({ onChange, ...field }) => (
        <Input
          {...field}
          type="number"
          onChange={(e) => onChange(e.target.valueAsNumber)}
        />
      )}
    </FormBase>
  );
};

export const FormPassword: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {(field) => <Input {...field} type="password" />}
    </FormBase>
  );
};

export const FormEmail: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {(field) => <Input {...field} type="email" />}
    </FormBase>
  );
};

export const FormDatePicker: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {({ value, onChange, onBlur, ...field }) => {
        const dateValue = value ? new Date(value) : undefined;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateValue && "text-muted-foreground",
                )}
                id={field.id}
                onBlur={onBlur}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue && !isNaN(dateValue.getTime()) ? (
                  format(dateValue, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={onChange}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    </FormBase>
  );
};

export const FormImagePreview = ({
  file,
}: {
  file: File | string | null | undefined;
}) => {
  const preview = useMemo(() => {
    if (file instanceof File && file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    if (typeof file === "string") return file;
    return null;
  }, [file]);

  useEffect(() => {
    return () => {
      if (file instanceof File) URL.revokeObjectURL(preview!);
    };
  }, [file, preview]);

  if (!preview) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
      <Image src={preview} alt="Preview" fill className="object-cover" />
    </div>
  );
};

export const FormFile: FormControlFunc = (props) => {
  return (
    <FormBase {...props}>
      {({ onChange, value: _value, ...field }) => (
        <Input
          {...field}
          type="file"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      )}
    </FormBase>
  );
};
