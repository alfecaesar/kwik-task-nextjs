import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorHoverCard } from "./ErrorHoverCard";
import { useFormContext } from "react-hook-form";

export default function DefaultInput({
  name,
  label,
  type,
  placeholder,
  errorText,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  errorText: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid gap-2 relative">
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
      />
      {errors[name] && <ErrorHoverCard message={errorText} />}
    </div>
  );
}
