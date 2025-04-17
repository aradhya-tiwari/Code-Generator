import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamObject, streamText } from "ai";
import { createFactory } from "hono/factory";
import { z } from "zod";

export const handler = createFactory().createHandlers(async (c) => {

    const body = c.req.parseBody()
    const messages = []
    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVEAI_API_KEY
    })

    let resp = streamObject({
        model: google("gemini-2.5-pro-exp-03-25"),
        schema: z.object({
            code: z.string().describe("only code and comments of the prompt in markdown format nothing else."),
            description: z.string().describe("description of the code")
        })
    })

})