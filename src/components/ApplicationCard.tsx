import React from "react";

export default function ApplicationCard({
  application,
  userType,
  children,
}: ApplicationCardProps) {
  return (
    <div className="rounded-lg border border-primary-200 bg-white p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">
            {application.property?.name ?? application.name ?? "Application"}
          </h3>
          <p className="mt-1 text-sm text-primary-500">
            {userType === "manager"
              ? application.name || application.email
              : application.property?.location?.city}
          </p>
        </div>
        <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium">
          {application.status}
        </span>
      </div>
      {children}
    </div>
  );
}
