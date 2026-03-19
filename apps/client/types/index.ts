export type TFileItem = { filename: string; path: string };

export type TConversationMessage = { result: string; context: string };

export type TUserQueriesAndResult = {
  prompt: string;
  message: TConversationMessage;
};
