import { ChatOpenAI } from "@langchain/openai";
import { createMiddleware, ToolMessage } from "langchain";

const basicModel = new ChatOpenAI({
  model: "gpt-4.1-mini",
});

const advancedModel = new ChatOpenAI({
  model: "gpt-4.1",
});

export const dynamicModelSelection = createMiddleware({
  name: "DynamicModelSelection",
  wrapModelCall: (request, handler) => {
    const messageCount = request.messages.length;

    return handler({
      ...request,
      model: messageCount > 50 ? advancedModel : basicModel,
    });
  },
});

export const handleToolErrors = createMiddleware({
  name: "HandleToolErrors",
  wrapToolCall: async (request, handler) => {
    try {
      return await handler(request);
    } catch (error) {
      return new ToolMessage({
        content: `Tool error: Please check your input and try again. (${error})`,
        tool_call_id: request.toolCall.id!,
      });
    }
  },
});
