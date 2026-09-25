"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAuthUserQuery,
  useGetConversationMessagesQuery,
  useGetConversationsQuery,
  useMarkConversationReadMutation,
  useSendMessageMutation,
} from "@/state/api";
import { Conversation } from "@/types/prismaTypes";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Building2, MessageCircle, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export default function MessagesPage() {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: conversations = [], isLoading } = useGetConversationsQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const selected = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedId) ?? null,
    [conversations, selectedId]
  );
  const { data: messages = [], isFetching } = useGetConversationMessagesQuery(selectedId ?? 0, {
    skip: selectedId === null,
    pollingInterval: 3000,
    refetchOnFocus: true,
  });
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [markRead] = useMarkConversationReadMutation();
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId !== null) void markRead(selectedId);
  }, [markRead, messages.length, selectedId]);

  useEffect(() => {
    const messageList = messageListRef.current;
    if (!messageList) return;
    messageList.scrollTo({ top: messageList.scrollHeight, behavior: "smooth" });
  }, [messages.length, selectedId]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (!selectedId || !body) return;
    try {
      setDraft("");
      await sendMessage({ conversationId: selectedId, body }).unwrap();
    } catch {
      setDraft(body);
      toast.error("Message could not be sent.");
    }
  };

  return (
    <div className="dashboard-container h-[calc(100dvh-80px)] min-h-0 overflow-hidden py-4 sm:py-6">
      <div className="grid h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-[minmax(260px,36%)_1fr]">
        <aside className={`${selected ? "hidden md:flex" : "flex"} min-h-0 flex-col border-r border-gray-200 bg-gray-50/60`}>
          <div className="shrink-0 border-b border-gray-200 bg-black px-5 py-5 text-white">
            <h1 className="text-xl font-semibold">Messages</h1>
            <p className="mt-1 text-xs text-gray-400">Property conversations</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {isLoading && <p className="p-4 text-sm text-gray-500">Loading conversations…</p>}
            {!isLoading && conversations.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center text-gray-500">
                <MessageCircle className="mb-3 h-10 w-10 text-secondary-500" />
                <p className="font-medium text-gray-800">No messages yet</p>
                <p className="mt-1 text-sm">Start a conversation from a property listing.</p>
              </div>
            )}
            {conversations.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                active={conversation.id === selectedId}
                onClick={() => setSelectedId(conversation.id)}
              />
            ))}
          </div>
        </aside>

        <section className={`${selected ? "flex" : "hidden md:flex"} min-h-0 flex-col bg-white`}>
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
              <MessageCircle className="mb-4 h-12 w-12 text-secondary-500" />
              <p className="text-lg font-medium text-gray-900">Choose a conversation</p>
            </div>
          ) : (
            <>
              <header className="flex shrink-0 items-center gap-3 border-b border-gray-200 px-4 py-3 sm:px-6">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedId(null)} aria-label="Back to conversations">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src={selected.otherUserImage ?? undefined} />
                  <AvatarFallback className="bg-secondary-100 font-semibold text-secondary-500">
                    {selected.otherUserName.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-950">{selected.otherUserName}</p>
                  <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                    <Building2 className="h-3 w-3" /> {selected.propertyName}
                  </p>
                </div>
              </header>
              <div ref={messageListRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#fafafa] p-4 sm:p-6" aria-live="polite">
                {isFetching && messages.length === 0 && <p className="text-center text-sm text-gray-500">Loading messages…</p>}
                {messages.length === 0 && !isFetching && (
                  <p className="py-8 text-center text-sm text-gray-500">Send the first message about this property.</p>
                )}
                {messages.map((message) => {
                  const own = message.senderUserId === authUser?.authInfo.userId;
                  return (
                    <div key={message.id} className={`flex ${own ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 shadow-sm sm:max-w-[70%] ${own ? "rounded-br-sm bg-secondary-500 text-white" : "rounded-bl-sm border border-gray-200 bg-white text-gray-900"}`}>
                        <p className="whitespace-pre-wrap break-words text-sm">{message.body}</p>
                        <p className={`mt-1 text-[11px] ${own ? "text-purple-100" : "text-gray-400"}`}>
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form className="flex shrink-0 items-end gap-3 border-t border-gray-200 bg-white p-3 sm:p-4" onSubmit={submit}>
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  maxLength={4000}
                  rows={2}
                  placeholder="Write a message…"
                  className="max-h-32 min-h-11 resize-none border-gray-300 focus-visible:ring-secondary-500"
                  aria-label="Message"
                />
                <Button type="submit" size="icon" disabled={isSending || !draft.trim()} className="h-11 w-11 shrink-0 rounded-full bg-secondary-500 text-white hover:bg-secondary-600" aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function ConversationRow({ conversation, active, onClick }: { conversation: Conversation; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`mb-2 flex w-full gap-3 rounded-xl p-3 text-left transition-colors ${active ? "bg-secondary-100 ring-1 ring-secondary-500" : "hover:bg-white"}`}>
      <Avatar className="h-11 w-11">
        <AvatarImage src={conversation.otherUserImage ?? undefined} />
        <AvatarFallback className="bg-black text-white">{conversation.otherUserName.slice(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className={`truncate text-sm ${conversation.unread ? "font-bold text-gray-950" : "font-medium text-gray-800"}`}>{conversation.otherUserName}</span>
          {conversation.unread && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-500" aria-label="Unread" />}
        </span>
        <span className="block truncate text-xs text-gray-500">{conversation.propertyName}</span>
        <span className={`mt-1 block truncate text-sm ${conversation.unread ? "font-semibold text-gray-800" : "text-gray-500"}`}>{conversation.lastMessage || "New conversation"}</span>
      </span>
    </button>
  );
}
