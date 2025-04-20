import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { chatHandler } from './routes/chat/index.route.js'
import { cors } from 'hono/cors'

const app = new Hono({ strict: false })
  .use("*", cors({
    origin: ["http://localhost:5173"]
  }))
  .route("/chat", chatHandler)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export const App = app
export type AppType = typeof app