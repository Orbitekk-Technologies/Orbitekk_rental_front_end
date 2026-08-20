import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  location: string;
  beds: string;
  baths: string;
  propertyType: string;
  amenities: string[];
  availableFrom: string;
  priceRange: [number, number] | [null, null];
  squareFeet: [number, number] | [null, null];
  coordinates: [number, number];
  city?: string;
  state?: string;
  page?: number;
  size?: number;
  sort?: "newest" | "price_asc" | "price_desc";
}

interface InitialStateTypes {
  filters: FiltersState;
  isFiltersFullOpen: boolean;
  viewMode: "grid" | "list";
}

export const initialState: InitialStateTypes = {
  filters: {
    location: "Dallas, Texas",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [-96.797, 32.7767],
    page: 0,
    size: 20,
    sort: "newest",
  },
  isFiltersFullOpen: false,
  viewMode: "list",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFiltersFullOpen: (state) => {
      state.isFiltersFullOpen = !state.isFiltersFullOpen;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setFilters, toggleFiltersFullOpen, setViewMode } =
  globalSlice.actions;

export default globalSlice.reducer;
