import { createFactory } from "hono/factory";
import { chatPostHandler } from "./post.handler.js";

export const app = createFactory().createApp()
    .post("/", ...chatPostHandler)

export { app as chatHandler }