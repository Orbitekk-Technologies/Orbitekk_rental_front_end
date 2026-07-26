import React from "react";

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-primary-900">{title}</h1>
      <p className="mt-1 text-sm text-primary-500">{subtitle}</p>
    </div>
  );
}
