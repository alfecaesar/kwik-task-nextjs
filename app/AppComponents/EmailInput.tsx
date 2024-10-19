import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorHoverCard } from "./ErrorHoverCard";

export default function EmailInput({ name, label }: { name: string; label: string}) {
  return (
    <div className="grid gap-2 relative">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type="email" placeholder="email@example.com" required />
      <ErrorHoverCard message={`${label} is required`} />
    </div>
  );
}
