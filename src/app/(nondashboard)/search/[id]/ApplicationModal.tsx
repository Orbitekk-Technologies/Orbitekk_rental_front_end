import { CustomFormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ApplicationFormData, applicationSchema } from "@/lib/schemas";
import { getApiErrorMessage } from "@/lib/apiError";
import { useCreateApplicationMutation, useGetAuthUserQuery } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ApplicationModal = ({
  isOpen,
  onClose,
  propertyId,
}: ApplicationModalProps) => {
  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  const { data: authUser } = useGetAuthUserQuery();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!authUser) {
      console.error("You must be logged in to submit an application");
      return;
    }

    try {
      await createApplication({ ...data, propertyId }).unwrap();
      toast.success("Application submitted successfully.");
      form.reset();
      onClose();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Unable to submit your application.")
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader className="mb-4">
          <DialogTitle>Submit Application for this Property</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomFormField
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your full name"
            />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              type="text"
              placeholder="Enter your phone number"
            />
            <CustomFormField
              name="message"
              label="Message (Optional)"
              type="textarea"
              placeholder="Enter any additional information"
            />
            <Button
              type="submit"
              className="bg-primary-700 text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
