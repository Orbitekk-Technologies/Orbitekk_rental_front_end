// apps/web/data/services.ts
export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  variant: "wide" | "normal";
};

export const services: ServiceItem[] = [
  {
    title: "Property Listings",
    description:
      "Easily browse and manage all your property listings with our user-friendly platform.",
    icon: "real_estate_agent",
    variant: "wide",
  },
  {
    title: "Financial Reporting",
    description:
      "Generate detailed financial statements and performance reports to stay on top of your property's financial health.",
    icon: "payments",
    variant: "normal",
  },
  {
    title: "Service Requests",
    description:
      "Efficiently handle maintenance requests and work orders through our app.",
    icon: "handyman",
    variant: "normal",
  },
  {
    title: "Tenant Management",
    description:
      "Keep track of tenant information and lease agreements without hassle. Our app allows you to store and manage all necessary details.",
    icon: "groups",
    variant: "wide",
  },
];