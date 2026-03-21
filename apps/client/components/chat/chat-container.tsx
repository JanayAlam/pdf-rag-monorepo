"use client";

import { API_SERVER_URL } from "@/lib/config";
import { TUserQueriesAndResult } from "@/types";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { ChatConversation } from "./chat-conversation";
import { ChatInput } from "./chat-input";

export const ChatContainer: React.FC = () => {
  const [queries, setQueries] = useState<TUserQueriesAndResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_SERVER_URL}/chats`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Couldn't send the query");
      }

      const { isSuccess, data } = await res.json();

      if (!isSuccess) {
        throw new Error("Couldn't get a response");
      }

      setQueries((prev) => [...prev, { prompt: query, result: data }]);
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <aside className="h-full flex flex-col gap-4 border--2 sm:border-t-0 sm:border-l row-span-2 sm:row-span-1 col-span-1 sm:col-span-2 p-4 sm:p-6">
      <ChatConversation queries={queries} isLoading={isLoading} />
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </aside>
  );
};
