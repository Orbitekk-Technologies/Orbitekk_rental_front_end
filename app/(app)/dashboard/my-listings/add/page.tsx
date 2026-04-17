import HomeownerDashboardShell from "@/components/dashboard/HomeownerDashboardShell";
import AddPropertyForm from "@/components/property-form/AddPropertyForm";

export default function AddPropertyPage() {
  return (
    <HomeownerDashboardShell active="listings">
      <AddPropertyForm />
    </HomeownerDashboardShell>
  );
}