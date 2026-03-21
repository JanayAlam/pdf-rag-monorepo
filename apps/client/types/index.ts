export type TFileItem = { filename: string; path: string };

export type TConversationResult = { output: string; context: string };

export type TUserQueriesAndResult = {
  prompt: string;
  result: TConversationResult;
};
