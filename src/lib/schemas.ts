import * as z from "zod";
import { AmenityEnum, PropertyTypeEnum } from "@/lib/constants";

const browserFileSchema =
  typeof File === "undefined" ? z.any() : z.instanceof(File);

export const propertySchema = z
  .object({
    name: z.string().trim(),
    description: z.string().trim(),
    stayType: z.enum(["PayingGuest", "WholeUnit"]),
    pricePerMonth: z.coerce
      .number()
      .nonnegative("Monthly rent cannot be negative")
      .int("Monthly rent must be a whole number"),
    securityDeposit: z.coerce
      .number()
      .nonnegative("Security deposit cannot be negative")
      .int("Security deposit must be a whole number"),
    isPetsAllowed: z.boolean(),
    isParkingIncluded: z.boolean(),
    photoUrls: z.array(browserFileSchema).default([]),
    existingPhotoUrls: z.array(z.string()).default([]),
    amenities: z
      .array(z.nativeEnum(AmenityEnum))
      .min(1, "Select at least one amenity"),
    bathType: z.enum(["Private", "SharedBath"]),
    genderPreference: z
      .array(z.enum(["Male", "Female", "NoPreference"]))
      .length(1, "Select one gender preference"),
    beds: z.coerce
      .number()
      .nonnegative("Beds cannot be negative")
      .max(10)
      .int(),
    baths: z.coerce
      .number()
      .nonnegative("Baths cannot be negative")
      .max(10)
      .int(),
    squareFeet: z.coerce
      .number()
      .positive("Square feet must be greater than zero")
      .int(),
    propertyType: z.nativeEnum(PropertyTypeEnum),
    address: z.string().trim().min(1, "Address is required"),
    city: z.string().trim().min(1, "City is required"),
    state: z.string().trim().min(1, "State is required"),
    country: z.string().trim().min(1, "Country is required"),
    postalCode: z.string().trim().min(1, "Postal code is required"),
  })
  .superRefine((data, context) => {
    if (data.photoUrls.length === 0 && data.existingPhotoUrls.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["photoUrls"],
        message: "At least one property photo is required",
      });
    }

    if (data.photoUrls.length + data.existingPhotoUrls.length > 5) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["photoUrls"],
        message: "You can upload a maximum of 5 property photos",
      });
    }

    data.photoUrls.forEach((file) => {
      if (
        typeof File !== "undefined" &&
        file instanceof File &&
        file.size > 10 * 1024 * 1024
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["photoUrls"],
          message: "Each property photo must be smaller than 10 MB",
        });
      }
    });
  });

export type PropertyFormData = z.infer<typeof propertySchema>;

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
