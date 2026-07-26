"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { settingsSchema, SettingsFormData } from "@/lib/schemas";
import { CustomFormField } from "@/components/FormField";

export default function SettingsForm({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) {
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  return (
    <div className="dashboard-container">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold capitalize">{userType} Settings</h1>
        <p className="mt-1 text-sm text-primary-500">
          Update your account details
        </p>
      </div>
      <div className="rounded-lg bg-white p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomFormField name="name" label="Name" />
            <CustomFormField name="email" label="Email" type="email" />
            <CustomFormField name="phoneNumber" label="Phone Number" />
            <Button type="submit" className="bg-primary-700 text-white">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
