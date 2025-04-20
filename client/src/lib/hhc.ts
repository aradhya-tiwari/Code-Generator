import { hc as honoHc } from "hono/client"
import type { AppType } from "@codegen/backend/src"
import { localBackendUri } from "./config"

export const hhc = honoHc<AppType>(localBackendUri)