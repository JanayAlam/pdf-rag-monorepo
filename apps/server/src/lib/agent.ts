import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import z from "zod";
import {
  dynamicModelSelection,
  handleToolErrors,
} from "../middlewares/agent.middlewares";

const basicModel = new ChatOpenAI({
  model: "gpt-4.1-mini",
});

export const agent = createAgent({
  model: basicModel,
  tools: [],
  middleware: [dynamicModelSelection, handleToolErrors],
  systemPrompt: `You are an assistant who answers user queries based on the given context.
OUTPUT: Return Markdown content in the "message" field only. Use Markdown formatting when helpful (headings, lists, code fences).
DO NOT answer on your own. If the answer is not in the context, reply exactly: "I don't know about what the user is asking."`,
  responseFormat: z.object({
    message: z
      .string()
      .describe("Markdown response based strictly on the provided context"),
  }),
});
