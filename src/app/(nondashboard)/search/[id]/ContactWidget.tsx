"use client";

import { Button } from "@/components/ui/button";
import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
  useStartConversationMutation,
} from "@/state/api";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)/authProvider";
import { FAVORITE_GLOW_EVENT } from "@/lib/constants";

const ContactWidget = ({ propertyId, onOpenModal }: ContactWidgetProps) => {
  const { user } = useAuth();
  const { data: authUser } = useGetAuthUserQuery(undefined, { skip: !user });
  // const { data: property } = useGetPropertyQuery(propertyId);
  const { data: tenant } = useGetTenantQuery(
    authUser?.authInfo?.userId || "",
    { skip: !authUser?.authInfo?.userId }
  );
  const [addFavorite, { isLoading: isAddingFavorite }] =
    useAddFavoritePropertyMutation();
  const [removeFavorite, { isLoading: isRemovingFavorite }] =
    useRemoveFavoritePropertyMutation();
  const [startConversation, { isLoading: isStartingConversation }] =
    useStartConversationMutation();
  const router = useRouter();
  const isFavorite =
    tenant?.favorites?.some((favorite) => favorite.id === propertyId) || false;
  const isUpdatingFavorite = isAddingFavorite || isRemovingFavorite;

  const handleButtonClick = () => {
    if (authUser) onOpenModal();
    else router.push("/signin");
  };

  const handleSendMessage = async () => {
    if (!authUser) {
      router.push(`/signin?returnTo=${encodeURIComponent(`/search/${propertyId}`)}`);
      return;
    }
    try {
      await startConversation({ propertyId }).unwrap();
      router.push("/messages");
    } catch {
      // The API error toast is intentionally kept local to avoid hiding the CTA.
    }
  };

  const handleFavoriteToggle = async () => {
    if (!authUser) {
      router.push("/signin");
      return;
    }

    window.dispatchEvent(new Event(FAVORITE_GLOW_EVENT));

    const args = { userId: authUser.authInfo.userId, propertyId };
    if (isFavorite) await removeFavorite(args);
    else await addFavorite(args);
  };

  return (
    <div className="min-w-[300px]">
      <div className="h-fit rounded-2xl border border-primary-200 bg-white p-7">
        {/* Temporarily hidden for this release. Restore this block when owner
            contact details are ready to be shown again.
        <div className="mb-4 flex items-center gap-5 rounded-xl border border-primary-200 p-4">
          <div className="flex items-center rounded-full bg-primary-900 p-4">
            <Phone className="text-primary-50" size={15} />
          </div>
          <div>
            <p>Contact This Property</p>
            <div className="text-lg font-bold text-primary-800">
              (424) 340-5574
            </div>
          </div>
        </div>
        */}
        <Button
          className="w-full bg-primary-700 text-white hover:bg-primary-600"
          onClick={handleButtonClick}
        >
          {authUser ? "Submit Application" : "Sign In to Apply"}
        </Button>

        {/* Temporarily hidden for this release. Restore when owner languages
            and appointment availability should be public again.
        <hr className="my-4" />
        <div className="text-sm">
          <div className="mb-1 text-primary-600">
            Language: English, Bahasa.
          </div>
          <div className="text-primary-600">
            Open by appointment on Monday - Sunday
          </div>
        </div>
        */}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-auto min-h-10 w-full whitespace-normal border-secondary-500 px-2 py-2 text-xs leading-tight text-secondary-500 hover:bg-secondary-500 hover:text-white"
          onClick={handleSendMessage}
          disabled={isStartingConversation}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {isStartingConversation ? "Opening…" : "Message Property Manager"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="relative h-auto min-h-9 w-full whitespace-normal border-primary-300 px-2 py-2 text-xs leading-tight text-primary-700 hover:bg-primary-700 hover:text-white"
          onClick={handleFavoriteToggle}
          disabled={isUpdatingFavorite}
        >
          <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Remove Favourite" : "Add to Favourites"}
        </Button>
      </div>
    </div>
  );
};

export default ContactWidget;
