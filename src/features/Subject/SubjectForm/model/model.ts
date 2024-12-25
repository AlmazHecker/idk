import { z } from "zod";

export const subjectFormSchema = z.object({
  title: z.string().trim().min(1, { message: "This field is required!" }),
  content: z.string().trim().min(1, { message: "This field is required!" }),
});

export type SubjectFormData = z.infer<typeof subjectFormSchema>;
