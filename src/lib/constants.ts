import { createMessageObjectSchema } from "@/openapi/schemas/create-message-object.js";
import * as HttpStatusPhrases from "@/util/http-status-phrases.js";

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);
