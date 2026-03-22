"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChatForm,
  ChatMessages,
  ChatContainer as ShadcnChatContainer,
} from "@/components/ui/chat";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { useChat } from "@/hooks/use-chat";
import { TextAlignStart } from "lucide-react";
import React from "react";

export const ChatContainer: React.FC = () => {
  const { query, messages, isSubmitting, handleInputChange, handleSubmit } =
    useChat();

  const isEmpty = messages.length === 0;

  return (
    <section className="h-full">
      <Card className="h-full">
        <CardContent className="flex-1 rounded-md">
          <ShadcnChatContainer className="h-full flex-col gap-4">
            <div className="flex-1">
              {isEmpty ? (
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <TextAlignStart />
                    </EmptyMedia>
                    <EmptyTitle>No queries yet</EmptyTitle>
                    <EmptyDescription>
                      You haven&apos;t asked any questions yet.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : null}

              {!isEmpty ? (
                <ChatMessages messages={messages}>
                  <MessageList messages={messages} isTyping={isSubmitting} />
                </ChatMessages>
              ) : null}
            </div>

            <ChatForm isPending={isSubmitting} handleSubmit={handleSubmit}>
              {({ files, setFiles }) => (
                <MessageInput
                  value={query}
                  onChange={handleInputChange}
                  allowAttachments
                  files={files}
                  setFiles={setFiles}
                  isGenerating={isSubmitting}
                />
              )}
            </ChatForm>
          </ShadcnChatContainer>
        </CardContent>
      </Card>
    </section>
  );
};
