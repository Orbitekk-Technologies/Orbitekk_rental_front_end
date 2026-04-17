import ListingsPageShell from "@/components/listings/ListingsPageShell";
import { properties } from "@/data/properties";
// 
export default function ListingsPage() {
  return (
    <ListingsPageShell
      properties={properties}
      isAuthenticated={false}
      locationTitle="Los Angeles"
      locationInput=""
    />
  );
}
// 

// import ListingsPageShell from "@/components/listings/ListingsPageShell";
// 
// export default function ListingsPage() {
  // return (
    // <ListingsPageShell
      // properties={[]}
      // isAuthenticated={false}
      // locationTitle="Your Location"
      // locationInput=""
    // />
  // );
// }