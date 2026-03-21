import { Queue } from "bullmq";
import { VALKEY_HOST, VALKEY_PORT } from "../settings/config";
import { BULLMQ_QUEUE_NAME } from "../settings/constants";

export class BullMQQueue {
  private static instance: Queue | null = null;

  static getInstance(): Queue {
    if (!BullMQQueue.instance) {
      BullMQQueue.instance = new Queue(BULLMQ_QUEUE_NAME, {
        connection: {
          host: VALKEY_HOST,
          port: VALKEY_PORT,
        },
      });
    }

    return BullMQQueue.instance;
  }
}
