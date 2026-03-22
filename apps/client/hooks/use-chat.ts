import { Message } from "@/components/ui/chat-message";
import { API_SERVER_URL } from "@/lib/config";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { toast } from "sonner";

export function useChat() {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (event?: {
    preventDefault?: (() => void) | undefined;
  }) => {
    event?.preventDefault?.();
    setIsSubmitting(true);
    try {
      setQuery("");

      setMessages((prev) => [
        ...prev,
        { id: nanoid(), role: "user", content: query },
      ]);

      const res = await fetch(`${API_SERVER_URL}/chats`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Couldn't send the query");
      }

      const { isSuccess, data } = await res.json();

      if (!isSuccess) {
        throw new Error("Couldn't get a response");
      }

      setMessages((prev) => [
        ...prev,
        { id: nanoid(), role: "assistant", content: data.output },
      ]);
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    query,
    messages,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
}
