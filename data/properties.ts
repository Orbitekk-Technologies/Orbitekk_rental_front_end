export type Property = {
  id: number;
  title: string;
  distance: string;
  price: string;
  image: string;
  status: "For Rent" | "For Sale";
  beds: number;
  baths: number;
  area: string;
};

export const properties: Property[] = [
  {
    id: 1,
    title: "Brookside Manor",
    distance: "38 miles away",
    price: "$2,024",
    image: "/images/properties/p1.png",
    status: "For Rent",
    beds: 6,
    baths: 5,
    area: "3,096.00 sqft",
  },
  {
    id: 2,
    title: "Maplewood Estates",
    distance: "34 miles away",
    price: "$1,224",
    image: "/images/properties/p2.png",
    status: "For Rent",
    beds: 4,
    baths: 3,
    area: "2,080.00 sqft",
  },
  {
    id: 3,
    title: "Maplewood Estates",
    distance: "34 miles away",
    price: "$1,224",
    image: "/images/properties/p3.png",
    status: "For Rent",
    beds: 4,
    baths: 3,
    area: "2,080.00 sqft",
  },
  {
    id: 4,
    title: "Palm Harbor",
    distance: "41 miles away",
    price: "$1,980",
    image: "/images/properties/p4.png",
    status: "For Rent",
    beds: 5,
    baths: 4,
    area: "2,950.00 sqft",
  },
  {
    id: 5,
    title: "Beverly Springfield",
    distance: "29 miles away",
    price: "$1,740",
    image: "/images/properties/p5.png",
    status: "For Rent",
    beds: 3,
    baths: 2,
    area: "1,960.00 sqft",
  },
  {
    id: 6,
    title: "Ocean View",
    distance: "22 miles away",
    price: "$2,410",
    image: "/images/properties/p6.png",
    status: "For Rent",
    beds: 4,
    baths: 3,
    area: "2,260.00 sqft",
  },
];