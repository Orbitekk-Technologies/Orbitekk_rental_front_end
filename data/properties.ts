export type Property = {
  id: number;
  title: string;
  image: string;
  status: "For Rent" | "For Sale";

  city: string;
  locationLabel: string;
  price: string;

  propertyType: "Studio" | "Apartment" | "Townhouse" | "Villa" | "House";
  rentalType: "Entire home" | "Private room" | "Share with Super Host";

  distance?: string;
  ownerName?: string;
  rating?: number;
  guests?: number;
  beds: number;
  baths: number;
  area: string;

  minPrice?: number;
  maxPrice?: number;
  lat?: number;
  lng?: number;
};

export const properties: Property[] = [
  {
    id: 1,
    title: "Fully Furnished Smart Studio Apartment",
    image: "/images/properties/p1.png",
    status: "For Rent",
    city: "Los Angeles",
    locationLabel: "Mercedes Vito",
    price: "$1,850/mo",
    propertyType: "Studio",
    rentalType: "Entire home",
    ownerName: "Mercedes Vito",
    rating: 4.8,
    guests: 2,
    beds: 1,
    baths: 2,
    area: "1,120 sqft",
    minPrice: 300,
    maxPrice: 500,
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 2,
    title: "Furnished Apartment",
    image: "/images/properties/p2.png",
    status: "For Rent",
    city: "Los Angeles",
    locationLabel: "Mercedes Vito",
    price: "$2,100/mo",
    propertyType: "Apartment",
    rentalType: "Entire home",
    ownerName: "Mercedes Vito",
    rating: 3.8,
    guests: 4,
    beds: 3,
    baths: 2,
    area: "1,640 sqft",
    minPrice: 300,
    maxPrice: 500,
    lat: 34.0407,
    lng: -118.2468,
  },
  {
    id: 3,
    title: "Clasic Studio Apartment",
    image: "/images/properties/p3.png",
    status: "For Rent",
    city: "Los Angeles",
    locationLabel: "Mercedes Vito",
    price: "$1,620/mo",
    propertyType: "Studio",
    rentalType: "Share with Super Host",
    ownerName: "Mercedes Vito",
    rating: 4.0,
    guests: 2,
    beds: 2,
    baths: 1,
    area: "980 sqft",
    minPrice: 300,
    maxPrice: 500,
    lat: 34.0301,
    lng: -118.255,
  },
];