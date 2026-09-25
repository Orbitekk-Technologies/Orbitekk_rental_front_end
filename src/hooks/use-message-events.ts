"use client";

import { getAccessToken } from "@/lib/authToken";
import { api } from "@/state/api";
import { useAppDispatch } from "@/state/redux";
import { useEffect } from "react";

export function useMessageEvents(enabled: boolean) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let reconnectTimer: number | undefined;

    const connect = async () => {
      const accessToken = getAccessToken();
      if (!accessToken || controller.signal.aborted) return;
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1/";
        const response = await fetch(`${baseUrl.replace(/\/$/, "")}/conversations/events`, {
          headers: { Authorization: `Bearer ${accessToken}`, Accept: "text/event-stream" },
          signal: controller.signal,
        });
        if (!response.ok || !response.body) throw new Error("Message event stream unavailable");
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (!controller.signal.aborted) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          if (events.some((event) => event.includes("event:message"))) {
            dispatch(api.util.invalidateTags(["Conversations", "Messages"]));
          }
        }
      } catch (error) {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === "AbortError")) return;
      }
      if (!controller.signal.aborted) reconnectTimer = window.setTimeout(connect, 3000);
    };

    void connect();
    return () => {
      controller.abort();
      window.clearTimeout(reconnectTimer);
    };
  }, [dispatch, enabled]);
}
