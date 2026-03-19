import { Router } from "express";
import { insertQueryController } from "./chat.controller";

const chatRouter = Router({ mergeParams: true });

chatRouter.post("/", insertQueryController);

export default chatRouter;
