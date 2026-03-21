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
  systemPrompt: `
    You are an assistant who resolved user queries based on the given context.

    OUTPUT:
      Return message based on the context, DO NOT answer on your own, if data not found on the context then say you don't know about what the user is asking.
  `,
  responseFormat: z.object({
    message: z.string().describe("Agents answer based on the user queries"),
  }),
});
