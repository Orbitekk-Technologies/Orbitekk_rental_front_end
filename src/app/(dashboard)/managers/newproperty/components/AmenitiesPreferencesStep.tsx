"use client";

import Image from "next/image";
import { GripVertical, ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CustomFormField } from "@/components/FormField";
import { PROPERTY_AMENITY_OPTIONS } from "@/lib/propertyForm";
import type { PropertyFormData } from "@/lib/schemas";

const AmenitiesPreferencesStep = () => {
  const form = useFormContext<PropertyFormData>();
  const existingPhotoUrls = form.watch("existingPhotoUrls") ?? [];
  const watchedUploadedPhotos = form.watch("photoUrls") as File[] | undefined;
  const uploadedPhotos = useMemo(() => watchedUploadedPhotos ?? [], [watchedUploadedPhotos]);
  const watchedOrder = form.watch("photoOrder") ?? [];
  const defaultOrder = [
    ...existingPhotoUrls.map((_, index) => `existing:${index}`),
    ...uploadedPhotos.map((_, index) => `upload:${index}`),
  ];
  const [order, setOrder] = useState<string[]>(
    watchedOrder.length > 0 ? watchedOrder : defaultOrder
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const uploadPreviews = useMemo(
    () => uploadedPhotos.map((file) => URL.createObjectURL(file)),
    [uploadedPhotos]
  );

  useEffect(() => () => uploadPreviews.forEach(URL.revokeObjectURL), [uploadPreviews]);

  useEffect(() => {
    const validItems = new Set(defaultOrder);
    setOrder((current) => {
      return [
        ...current.filter((item) => validItems.has(item)),
        ...defaultOrder.filter((item) => !current.includes(item)),
      ];
    });
  }, [existingPhotoUrls.length, uploadedPhotos.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const currentOrder = form.getValues("photoOrder") ?? [];
    if (
      currentOrder.length === order.length &&
      currentOrder.every((item, index) => item === order[index])
    ) return;

    form.setValue("photoOrder", order, { shouldDirty: true });
  }, [form, order]);

  const movePhoto = (source: string, destination: string) => {
    if (source === destination) return;
    const next = [...order];
    const sourceIndex = next.indexOf(source);
    const destinationIndex = next.indexOf(destination);
    next.splice(sourceIndex, 1);
    next.splice(destinationIndex, 0, source);
    setOrder(next);
    form.setValue("photoOrder", next, { shouldDirty: true, shouldValidate: true });
  };

  const removePhoto = (item: string) => {
    const [kind, rawIndex] = item.split(":");
    const removedIndex = Number(rawIndex);
    const source = kind === "existing" ? existingPhotoUrls : uploadedPhotos;
    const nextSource = source.filter((_, index) => index !== removedIndex);
    const remap = (entry: string) => {
      const [entryKind, entryIndexText] = entry.split(":");
      const entryIndex = Number(entryIndexText);
      if (entryKind !== kind) return entry;
      return `${entryKind}:${entryIndex > removedIndex ? entryIndex - 1 : entryIndex}`;
    };
    const nextOrder = order.filter((entry) => entry !== item).map(remap);
    form.setValue(kind === "existing" ? "existingPhotoUrls" : "photoUrls", nextSource, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("photoOrder", nextOrder, { shouldDirty: true });
    setOrder(nextOrder);
  };

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const remaining = Math.max(0, 5 - existingPhotoUrls.length - uploadedPhotos.length);
    const additions = Array.from(files).slice(0, remaining);
    form.setValue("photoUrls", [...uploadedPhotos, ...additions], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-7">
      <section className="space-y-5">
        <h3 className="text-sm font-semibold text-gray-900">
          Amenities
        </h3>
        <CustomFormField
          name="amenities"
          label="Amenities"
          type="checkbox-group"
          options={PROPERTY_AMENITY_OPTIONS}
        />
      </section>

      <div className="border-t border-gray-200" />

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">Photos</h3>

        {order.length > 0 && (
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {order.map((item, index) => {
                const [kind, rawIndex] = item.split(":");
                const sourceIndex = Number(rawIndex);
                const photoUrl = kind === "existing" ? existingPhotoUrls[sourceIndex] : uploadPreviews[sourceIndex];
                return (
                <div
                  key={item}
                  draggable
                  onDragStart={() => setDraggedItem(item)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => draggedItem && movePhoto(draggedItem, item)}
                  onDragEnd={() => setDraggedItem(null)}
                  className="group relative aspect-[4/3] cursor-grab overflow-hidden rounded-lg border border-gray-200 bg-gray-100 active:cursor-grabbing"
                >
                  <Image
                    src={photoUrl}
                    alt={`Property photo ${index + 1}`}
                    fill
                    unoptimized={photoUrl.startsWith("data:") || photoUrl.startsWith("blob:")}
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-2 text-white">
                    <span className="flex items-center gap-1 text-xs font-medium">
                      <GripVertical className="h-4 w-4" />
                      {index === 0 ? "Cover photo" : `Photo ${index + 1}`}
                    </span>
                    <button type="button" onClick={() => removePhoto(item)} aria-label={`Remove photo ${index + 1}`} className="rounded bg-black/40 p-1 hover:bg-black/70">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {existingPhotoUrls.length + uploadedPhotos.length < 5 && (
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-5 text-sm font-medium text-gray-700 hover:border-secondary-500 hover:bg-secondary-50">
            <ImagePlus className="h-5 w-5" />
            Add property photos
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => { addPhotos(event.target.files); event.target.value = ""; }} />
          </label>
        )}
        <p className="text-sm text-gray-500">
          Upload up to 5 images, each smaller than 10 MB. Drag photos to reorder them—the first image is your property&apos;s cover photo on search and detail pages.
        </p>
      </section>

      <div className="border-t border-gray-200" />

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Pricing</h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose a publishing plan for this property.
          </p>
        </div>

        <div
          className="grid gap-3 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Property pricing plan"
        >
          <button
            type="button"
            role="radio"
            aria-checked="true"
            className="min-h-28 rounded-xl border border-secondary-500 bg-secondary-500 p-4 text-left text-white shadow-sm"
          >
            <span className="block font-semibold">Starter</span>
            <span className="mt-2 block text-sm">$0/month</span>
            <span className="mt-3 block text-xs font-medium uppercase tracking-wide">
              Selected
            </span>
          </button>

          {[
            { name: "Basic", price: "$X/month" },
            { name: "Premium", price: "$XX/month" },
          ].map((plan) => (
            <button
              key={plan.name}
              type="button"
              role="radio"
              aria-checked="false"
              disabled
              className="min-h-28 cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 p-4 text-left text-gray-400 opacity-75"
            >
              <span className="block font-semibold">{plan.name}</span>
              <span className="mt-2 block text-sm">{plan.price}</span>
              <span className="mt-3 block text-xs font-medium uppercase tracking-wide">
                Coming soon
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AmenitiesPreferencesStep;
