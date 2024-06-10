import { z } from "zod";

export const messageSchema  = z.object({
    content: z
    .string()
    .min(10,{message:'content must be 10 character at least'})
    .max(300,{message:'content must be no longer than 300 characters'})
})