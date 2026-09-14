import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { CustomFormField } from "./FormField";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import PasswordInput from "./PasswordInput";
import { useChangePasswordMutation } from "@/state/api";
import { toast } from "sonner";

const SettingsForm = ({
  initialData,
  onSubmit,
  canChangePassword = false,
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.reset(initialData);
    }
  };

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data);
    setEditMode(false);
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwords.newPassword.length < 10) {
      toast.error("New password must contain at least 10 characters.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await changePassword(passwords).unwrap();
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      // The API mutation reports the server's error.
    }
  };

  return (
    <div className="pt-8 pb-5 px-8">
      <div className="mb-5">
        <h1 className="text-xl font-semibold">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account preferences and personal information
        </p>
      </div>
      <div className="bg-white rounded-xl p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <CustomFormField name="name" label="Name" disabled={!editMode} />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              disabled={!editMode}
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              disabled={!editMode}
            />

            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                onClick={toggleEditMode}
                className="bg-secondary-500 text-white hover:bg-secondary-600"
              >
                {editMode ? "Cancel" : "Edit"}
              </Button>
              {editMode && (
                <Button
                  type="submit"
                  className="bg-primary-700 text-white hover:bg-primary-800"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
      {canChangePassword && (
        <div className="mt-6 rounded-xl bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <p className="mt-1 text-sm text-gray-500">
              Confirm your current password before choosing a new one.
            </p>
          </div>
          <form onSubmit={handlePasswordChange} className="max-w-xl space-y-4">
            {[
              ["currentPassword", "Current Password"],
              ["newPassword", "New Password"],
              ["confirmPassword", "Confirm New Password"],
            ].map(([name, label]) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <PasswordInput
                  id={name}
                  required
                  minLength={name === "currentPassword" ? undefined : 10}
                  autoComplete={name === "currentPassword" ? "current-password" : "new-password"}
                  value={passwords[name as keyof typeof passwords]}
                  onChange={(event) =>
                    setPasswords((current) => ({ ...current, [name]: event.target.value }))
                  }
                />
              </div>
            ))}
            <Button
              type="submit"
              disabled={isChangingPassword}
              className="bg-primary-700 text-white hover:bg-primary-800"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsForm;
