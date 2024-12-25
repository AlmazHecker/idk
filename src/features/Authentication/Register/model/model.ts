import { z } from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Email is required!" }),
    password: z.string().min(8, "Password should be at least 8 characters!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match!",
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
