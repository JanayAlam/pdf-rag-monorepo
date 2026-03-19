"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface ChatInputProps {
  onSubmit: (query: string) => void | Promise<void>;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    await onSubmit(trimmed);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        rows={2}
        className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="min-w-20"
      >
        {isLoading ? <Spinner /> : null}
        Send
      </Button>
    </form>
  );
};
