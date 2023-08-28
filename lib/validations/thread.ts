import * as z from "zod";
export const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimuim 3 characters" }),
  accountId: z.string(),
});
export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimuim 3 characters" }),
});