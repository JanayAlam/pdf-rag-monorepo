import { TUserQueriesAndResult } from "@/types";
import React from "react";
import { Spinner } from "../ui/spinner";

interface ChatConversationProps {
  queries: TUserQueriesAndResult[];
  isLoading?: boolean;
}

export const ChatConversation: React.FC<ChatConversationProps> = ({
  queries,
  isLoading = false,
}) => {
  if (isLoading && queries.length === 0) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 w-full overflow-y-auto space-y-3">
      {queries.length ? (
        queries.map(({ prompt, message }, index) => (
          <div
            key={`${index}-${message.result.slice(0, 12)}`}
            className="rounded-lg border bg-background/60 px-3 py-2 flex flex-col gap-3"
          >
            <p className="text-sm leading-6 font-bold">{prompt}</p>
            <p className="text-sm leading-6">{message.context}</p>
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
          Ask your first question to start the conversation
        </div>
      )}
    </div>
  );
};
