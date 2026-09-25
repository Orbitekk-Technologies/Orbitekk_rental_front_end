import { cleanParams, withToast } from "@/lib/utils";
import { getAccessToken } from "@/lib/authToken";
import {
  FRONTEND_DEMO_MODE,
  getDemoApiData,
} from "@/lib/demoData";
import {
  Application,
  Lease,
  LeaseDocumentInfo,
  Manager,
  Payment,
  PaymentMethod,
  NearbyPlacesResponse,
  Property,
  PropertySearchResult,
  SavePaymentMethodRequest,
  Tenant,
  Conversation,
  ChatMessage,
} from "@/types/prismaTypes";
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { FiltersState } from ".";

const springBootBaseQuery = fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1/",
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, apiContext, extraOptions) => {
  if (FRONTEND_DEMO_MODE) {
    const request = typeof args === "string" ? { url: args } : args;
    return {
      data: getDemoApiData(
        request.url,
        request.method?.toUpperCase(),
        request.body,
        request.params as Record<string, unknown> | undefined
      ),
    };
  }

  return springBootBaseQuery(args, apiContext, extraOptions);
};

export const api = createApi({
  baseQuery,
  reducerPath: "api",
  tagTypes: [
    "Managers",
    "Tenants",
    "Properties",
    "PropertyDetails",
    "Leases",
    "Payments",
    "PaymentMethods",
    "Applications",
    "Conversations",
    "Messages",
  ],
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "auth/login", method: "POST", body }),
    }),

    refreshSession: build.mutation<AuthResponse, void>({
      query: () => ({ url: "auth/refresh", method: "POST" }),
    }),

    signup: build.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({ url: "auth/signup", method: "POST", body }),
    }),

    resetPassword: build.mutation<AuthResponse, ResetPasswordRequest>({
      query: (body) => ({ url: "auth/reset-password", method: "POST", body }),
    }),

    changePassword: build.mutation<void, ChangePasswordRequest>({
      query: (body) => ({ url: "auth/change-password", method: "POST", body }),
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Password changed successfully.",
          error: "Unable to change password.",
        });
      },
    }),

    enableManager: build.mutation<AuthResponse, { authorizedToList: boolean }>({
      query: (body) => ({ url: "auth/enable-manager", method: "POST", body }),
      invalidatesTags: ["Managers", "Tenants"],
    }),

    getAuthUser: build.query<User, void>({
      query: () => "auth/me",
    }),

    // property related endpoints
    getProperties: build.query<
      Property[],
      Partial<FiltersState> & { favoriteIds?: number[] }
    >({
      query: (filters) => ({
        url: "properties",
        params: cleanParams({ favoriteIds: filters.favoriteIds?.join(",") }),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Properties" as const, id })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
    }),

    searchProperties: build.query<PropertySearchResult, Partial<FiltersState>>({
      query: (filters) => {
        const params = cleanParams({
          location: filters.location,
          priceMin: filters.priceRange?.[0],
          priceMax: filters.priceRange?.[1],
          beds: filters.beds,
          baths: filters.baths,
          propertyType: filters.propertyType,
          stayType: filters.stayType,
          listedBy: filters.listedBy,
          bathType: filters.bathType,
          // Gender preference filtering is disabled for now.
          petsAllowed: filters.petsAllowed,
          parkingIncluded: filters.parkingIncluded,
          smokingIncluded: filters.smokingIncluded,
          petCount: filters.petCount,
          petFeeMax: filters.petFeeMax,
          parkingFeeMax: filters.parkingFeeMax,
          squareFeetMin: filters.squareFeet?.[0],
          squareFeetMax: filters.squareFeet?.[1],
          amenities: filters.amenities?.join(","),
          availableFrom: filters.availableFrom,
          latitude: filters.coordinates?.[1],
          longitude: filters.coordinates?.[0],
          boundary: filters.boundary
            ?.map(([longitude, latitude]) => `${longitude},${latitude}`)
            .join(";"),
          city: filters.city,
          state: filters.state,
          postalCode: filters.postalCode,
          page: filters.page,
          size: filters.size,
          sort: filters.sort,
        });

        if (!filters.coordinates?.some((coordinate) => coordinate !== 0)) {
          delete params.latitude;
          delete params.longitude;
        }
        return { url: "properties/search", params };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.properties.map(({ id }) => ({ type: "Properties" as const, id })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch properties.",
        });
      },
    }),

    getProperty: build.query<Property, number>({
      query: (id) => `properties/${id}`,
      providesTags: (result, error, id) => [{ type: "PropertyDetails", id }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to load property details.",
        });
      },
    }),

    getNearbyPlaces: build.query<NearbyPlacesResponse, number>({
      query: (id) => `properties/${id}/nearby`,
    }),

    // tenant related endpoints
    getTenant: build.query<Tenant, string>({
      query: (userId) => `tenants/${userId}`,
      providesTags: (result) => [{ type: "Tenants", id: result?.id }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to load tenant profile.",
        });
      },
    }),

    getCurrentResidences: build.query<Property[], string>({
      query: (userId) => `tenants/${userId}/current-residences`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Properties" as const, id })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch current residences.",
        });
      },
    }),

    getFavoriteProperties: build.query<Property[], void>({
      query: () => "tenants/me/favorites",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Properties" as const, id })),
              { type: "Properties", id: "FAVORITES" },
            ]
          : [{ type: "Properties", id: "FAVORITES" }],
    }),

    updateTenantSettings: build.mutation<
      Tenant,
      { userId: string } & Partial<Tenant>
    >({
      query: ({ userId, ...updatedTenant }) => ({
        url: `tenants/${userId}`,
        method: "PUT",
        body: updatedTenant,
      }),
      invalidatesTags: (result) => [{ type: "Tenants", id: result?.id }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Settings updated successfully!",
          error: "Failed to update settings.",
        });
      },
    }),

    addFavoriteProperty: build.mutation<
      Tenant,
      { userId: string; propertyId: number }
    >({
      query: ({ propertyId }) => ({
        url: `tenants/me/favorites/${propertyId}`,
        method: "POST",
      }),
      invalidatesTags: (result) => [
        { type: "Tenants", id: result?.id },
        { type: "Properties", id: "LIST" },
        { type: "Properties", id: "FAVORITES" },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Added to favorites!!",
          error: "Failed to add to favorites",
        });
      },
    }),

    removeFavoriteProperty: build.mutation<
      Tenant,
      { userId: string; propertyId: number }
    >({
      query: ({ propertyId }) => ({
        url: `tenants/me/favorites/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => [
        { type: "Tenants", id: result?.id },
        { type: "Properties", id: "LIST" },
        { type: "Properties", id: "FAVORITES" },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Removed from favorites!",
          error: "Failed to remove from favorites.",
        });
      },
    }),

    // manager related endpoints
    getManagerProperties: build.query<Property[], string>({
      query: (userId) => `managers/${userId}/properties`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Properties" as const, id })),
              { type: "Properties", id: "LIST" },
            ]
          : [{ type: "Properties", id: "LIST" }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to load manager profile.",
        });
      },
    }),

    updateManagerSettings: build.mutation<
      Manager,
      { userId: string } & Partial<Manager>
    >({
      query: ({ userId, ...updatedManager }) => ({
        url: `managers/${userId}`,
        method: "PUT",
        body: updatedManager,
      }),
      invalidatesTags: (result) => [{ type: "Managers", id: result?.id }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Settings updated successfully!",
          error: "Failed to update settings.",
        });
      },
    }),

    createProperty: build.mutation<Property, FormData>({
      query: (newProperty) => ({
        url: `properties`,
        method: "POST",
        body: newProperty,
      }),
      invalidatesTags: (result) => [
        { type: "Properties", id: "LIST" },
        { type: "Managers", id: result?.manager?.id },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Property created successfully!",
          error: "Failed to create property.",
        });
      },
    }),

    updateProperty: build.mutation<
      Property,
      { id: number; property: FormData }
    >({
      query: ({ id, property }) => ({
        url: `properties/${id}`,
        method: "PUT",
        body: property,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Properties", id: "LIST" },
        { type: "Properties", id },
        { type: "PropertyDetails", id },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Property updated successfully!",
          error: "Failed to update property.",
        });
      },
    }),

    archiveProperty: build.mutation<Property, number>({
      query: (id) => ({ url: `properties/${id}/archive`, method: "PATCH" }),
      invalidatesTags: (result, error, id) => [
        { type: "Properties", id: "LIST" },
        { type: "Properties", id },
        { type: "PropertyDetails", id },
      ],
    }),

    unarchiveProperty: build.mutation<Property, number>({
      query: (id) => ({ url: `properties/${id}/unarchive`, method: "PATCH" }),
      invalidatesTags: (result, error, id) => [
        { type: "Properties", id: "LIST" },
        { type: "Properties", id },
        { type: "PropertyDetails", id },
      ],
    }),

    deleteProperty: build.mutation<void, number>({
      query: (id) => ({ url: `properties/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "Properties", id: "LIST" },
        { type: "Properties", id },
        { type: "PropertyDetails", id },
      ],
    }),

    // lease related enpoints
    getLeases: build.query<Lease[], "tenant" | "manager" | void>({
      query: (view) => view ? `leases?view=${view}` : "leases",
      providesTags: ["Leases"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch leases.",
        });
      },
    }),

    getPropertyLeases: build.query<Lease[], number>({
      query: (propertyId) => `properties/${propertyId}/leases`,
      providesTags: ["Leases"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch property leases.",
        });
      },
    }),

    getLeaseDocument: build.query<LeaseDocumentInfo, number>({
      query: (propertyId) => `properties/${propertyId}/lease-document`,
      providesTags: (_result, _error, propertyId) => [{ type: "Leases", id: `document-${propertyId}` }],
    }),

    uploadLeaseDocument: build.mutation<LeaseDocumentInfo, { propertyId: number; file: File }>({
      query: ({ propertyId, file }) => {
        const body = new FormData();
        body.append("file", file);
        return { url: `properties/${propertyId}/lease-document`, method: "POST", body };
      },
      invalidatesTags: (_result, _error, { propertyId }) => [{ type: "Leases", id: `document-${propertyId}` }],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, { success: "Lease document uploaded.", error: "Failed to upload lease document." });
      },
    }),

    getPayments: build.query<Payment[], { leaseId: number; view?: "tenant" | "manager" }>({
      query: ({ leaseId, view }) => `leases/${leaseId}/payments${view ? `?view=${view}` : ""}`,
      providesTags: ["Payments"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch payment info.",
        });
      },
    }),

    getPaymentMethod: build.query<PaymentMethod | null, string>({
      query: (userId) => `tenants/${userId}/payment-method`,
      providesTags: ["PaymentMethods"],
    }),

    createPaymentMethod: build.mutation<
      PaymentMethod,
      { userId: string; data: SavePaymentMethodRequest }
    >({
      query: ({ userId, data }) => ({
        url: `tenants/${userId}/payment-method`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PaymentMethods"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Payment method added successfully!",
          error: "Failed to add payment method.",
        });
      },
    }),

    updatePaymentMethod: build.mutation<
      PaymentMethod,
      { userId: string; data: SavePaymentMethodRequest }
    >({
      query: ({ userId, data }) => ({
        url: `tenants/${userId}/payment-method`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PaymentMethods"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Payment method updated successfully!",
          error: "Failed to update payment method.",
        });
      },
    }),

    removePaymentMethod: build.mutation<void, string>({
      query: (userId) => ({
        url: `tenants/${userId}/payment-method`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentMethods"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Payment method removed successfully!",
          error: "Failed to remove payment method.",
        });
      },
    }),

    // application related endpoints
    getApplications: build.query<Application[], "tenant" | "manager" | void>({
      query: (view) => view ? `applications?view=${view}` : "applications",
      providesTags: ["Applications"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          error: "Failed to fetch applications.",
        });
      },
    }),

    updateApplicationStatus: build.mutation<
      Application & { lease?: Lease },
      { id: number; status: string; startDate?: string; endDate?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `applications/${id}/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Applications", "Leases"],
      async onQueryStarted(_, { queryFulfilled }) {
        await withToast(queryFulfilled, {
          success: "Application status updated successfully!",
          error: "Failed to update application settings.",
        });
      },
    }),

    createApplication: build.mutation<
      Application,
      Pick<Application, "propertyId" | "name" | "email" | "phoneNumber" | "desiredMoveInDate"> & {
        message?: string;
      }
    >({
      query: (body) => ({
        url: `applications`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Applications"],
    }),

    getConversations: build.query<Conversation[], void>({
      query: () => "conversations",
      providesTags: ["Conversations"],
    }),

    startConversation: build.mutation<Conversation, { propertyId: number }>({
      query: (body) => ({ url: "conversations", method: "POST", body }),
      invalidatesTags: ["Conversations"],
    }),

    getConversationMessages: build.query<ChatMessage[], number>({
      query: (conversationId) => `conversations/${conversationId}/messages`,
      providesTags: (_result, _error, id) => [{ type: "Messages", id }],
    }),

    sendMessage: build.mutation<ChatMessage, { conversationId: number; body: string }>({
      query: ({ conversationId, body }) => ({
        url: `conversations/${conversationId}/messages`,
        method: "POST",
        body: { body },
      }),
      invalidatesTags: (_result, _error, { conversationId }) => [
        "Conversations",
        { type: "Messages", id: conversationId },
      ],
    }),

    markConversationRead: build.mutation<void, number>({
      query: (conversationId) => ({
        url: `conversations/${conversationId}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Conversations"],
    }),

    getUnreadConversationCount: build.query<{ count: number }, void>({
      query: () => "conversations/unread-count",
      providesTags: ["Conversations"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshSessionMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useEnableManagerMutation,
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
  useUpdateManagerSettingsMutation,
  useGetPropertiesQuery,
  useSearchPropertiesQuery,
  useGetPropertyQuery,
  useGetNearbyPlacesQuery,
  useGetCurrentResidencesQuery,
  useGetFavoritePropertiesQuery,
  useGetManagerPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useArchivePropertyMutation,
  useUnarchivePropertyMutation,
  useDeletePropertyMutation,
  useGetTenantQuery,
  useAddFavoritePropertyMutation,
  useRemoveFavoritePropertyMutation,
  useGetLeasesQuery,
  useGetPropertyLeasesQuery,
  useGetLeaseDocumentQuery,
  useUploadLeaseDocumentMutation,
  useGetPaymentsQuery,
  useGetPaymentMethodQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useRemovePaymentMethodMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useCreateApplicationMutation,
  useGetConversationsQuery,
  useStartConversationMutation,
  useGetConversationMessagesQuery,
  useSendMessageMutation,
  useMarkConversationReadMutation,
  useGetUnreadConversationCountQuery,
} = api;
