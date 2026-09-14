"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import type { Application } from "@/types/prismaTypes";
import { useUpdateApplicationStatusMutation } from "@/state/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const dateInputValue = (value?: string | Date | null) =>
  value ? String(value).slice(0, 10) : "";

export default function LeaseDateEditor({
  application,
  iconOnly = false,
}: {
  application: Application;
  iconOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [updateStatus, { isLoading }] = useUpdateApplicationStatusMutation();

  useEffect(() => {
    if (!open) return;
    setStartDate(dateInputValue(application.lease?.startDate));
    setEndDate(dateInputValue(application.lease?.endDate));
  }, [application.lease?.endDate, application.lease?.startDate, open]);

  const confirmDates = async () => {
    if (!startDate || !endDate) {
      toast.error("Select both a start date and an end date.");
      return;
    }
    if (endDate <= startDate) {
      toast.error("End date must be after start date.");
      return;
    }

    try {
      await updateStatus({
        id: application.id,
        status: "Approved",
        startDate,
        endDate,
      }).unwrap();
      setOpen(false);
    } catch {
      // The API mutation presents the server error toast.
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={iconOnly ? "ghost" : "default"}
        size={iconOnly ? "icon" : "default"}
        className={iconOnly ? "h-7 w-7 text-gray-500 hover:text-primary-700" : "bg-green-600 text-white hover:bg-green-500"}
        aria-label={iconOnly ? "Edit lease dates" : undefined}
        onClick={() => setOpen(true)}
      >
        {iconOnly ? <Pencil className="h-4 w-4" /> : "Approve"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {application.status === "Approved" ? "Edit lease dates" : "Approve application"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-2 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`lease-start-${application.id}`}>Start Date</Label>
              <Input
                id={`lease-start-${application.id}`}
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`lease-end-${application.id}`}>End Date</Label>
              <Input
                id={`lease-end-${application.id}`}
                type="date"
                min={startDate || undefined}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="button" onClick={confirmDates} disabled={isLoading} className="bg-primary-700 text-white hover:bg-primary-600">
              {isLoading ? "Saving..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
