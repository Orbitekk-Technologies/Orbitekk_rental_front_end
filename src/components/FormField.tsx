"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type CustomFormFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "textarea" | "select" | "switch" | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  className?: string;
};

export function CustomFormField({
  name,
  label,
  type = "text",
  placeholder,
  options = [],
  accept,
  className,
}: CustomFormFieldProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const value = watch(name);
  const error = errors[name]?.message;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={name} placeholder={placeholder} {...register(name)} />
      ) : type === "select" ? (
        <Select
          value={value == null ? null : String(value)}
          onValueChange={(nextValue) =>
            setValue(name, nextValue, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger id={name} className="w-full">
            <SelectValue placeholder={placeholder ?? label} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : type === "switch" ? (
        <Switch
          id={name}
          checked={Boolean(value)}
          onCheckedChange={(checked) => setValue(name, checked)}
        />
      ) : type === "file" ? (
        <Input
          id={name}
          type="file"
          accept={accept}
          multiple
          onChange={(event) =>
            setValue(name, Array.from(event.target.files ?? []), {
              shouldValidate: true,
            })
          }
        />
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, type === "number" ? { valueAsNumber: true } : {})}
        />
      )}
      {typeof error === "string" && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
