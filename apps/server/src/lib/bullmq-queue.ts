import { Queue } from "bullmq";
import { VALKEY_HOST, VALKEY_PORT } from "../settings/config";
import { BULLMQ_QUEUE_NAME } from "../settings/constants";

export const queue = new Queue(BULLMQ_QUEUE_NAME, {
  connection: {
    host: VALKEY_HOST,
    port: VALKEY_PORT,
  },
});
