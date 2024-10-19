import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorHoverCard } from "./ErrorHoverCard";

export default function PasswordInput({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <div className="grid gap-2 relative">
      <Label htmlFor="password">{label}</Label>
      <Input id={name} type="password" required />
      <ErrorHoverCard message="Invalid Password" />
    </div>
  );
}
