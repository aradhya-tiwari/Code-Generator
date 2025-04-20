import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Output, streamObject, streamText } from "ai";
import { createFactory } from "hono/factory";
import { z } from "zod";
import { config } from "dotenv"
import { streamSSE, streamText as honoStreamText, stream } from "hono/streaming";

config()
const handler = createFactory().createHandlers(async (c) => {

    // const body = c.req.parseBody()
    const messages = []
    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVEAI_API_KEY
    })

    let resp = streamObject({
        model: google("gemini-2.0-flash-exp"),
        // experimental_output: Output.object({
        schema: z.object({
            code: (z.string().describe("only code and comments of the prompt in markdown format nothing else.")),
            description: z.string().describe("description of the code")
        }),
        // }),
        messages: [{
            role: "system",
            content: "You are a svelte 5 and shadcn-svelte component creator agent, dont use any other stack strictly adhere to this. Give response in structured output"
        },
        { role: "user", content: "Create a calendar component" }
        ],

    })
    c.header('X-Vercel-AI-Data-Stream', 'v1');
    c.header('Content-Type', 'application/octet-stream');
    let pipedTextStream = resp.partialObjectStream
    // let text = await resp.object

    // console.log(await resp.text)
    // return stream(c, (strm) => strm.pipe(resp.toTextStreamResponse()))
    console.log(await resp)
    // console.log(text)


    return honoStreamText(c, async (strm) => {
        while (!pipedTextStream.locked) {
            console.log(pipedTextStream.locked)
            for await (const obj of pipedTextStream) {
                console.log(obj)
                await strm.writeln(JSON.stringify(obj))
            }
        }
    })
    // return c.json(await resp.object)
    // return c.json(text)
})
export { handler as chatPostHandler }