import { z } from "zod";

export const wordFormSchema = z.object({
  word: z.string().trim().min(1, { message: "This field is required!" }),
  translation: z.string().trim().min(1, { message: "This field is required!" }),
  subject: z
    .object({
      title: z.string(),
      id: z.number(),
    })
    .optional()
    .nullable(),
});

export type WordFormData = z.infer<typeof wordFormSchema>;
