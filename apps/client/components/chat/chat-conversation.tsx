import { TUserQueriesAndResult } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
        queries.map(({ prompt, result }, index) => (
          <div
            key={`${index}-${result.output.slice(0, 12)}`}
            className="rounded-lg border bg-background/60 px-3 py-2 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-1">
              <h1 className="text-base font-bold">{prompt}</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Context</Button>
                </DialogTrigger>
                <DialogContent className="min-w-xl scroll-auto w-full p-0 gap-0">
                  <DialogHeader className="p-4 sm:px-6 border-b bg-muted/50 rounded-tl-xl rounded-tr-xl">
                    <DialogTitle>Context</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-150 overflow-y-auto">
                    <div className="p-4 sm:px-6">
                      <p className="text-sm leading-6">{result.context}</p>
                    </div>
                  </div>
                  <DialogFooter className="mx-0 mt-0 mb-0 sm:px-6">
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm leading-6">{result.output}</p>
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
