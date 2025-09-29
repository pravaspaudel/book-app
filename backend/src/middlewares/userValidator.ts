import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(4, { message: "username should be at least 4 characters long" })
    .max(20, { message: "username should not exceed 20 characters" }),
  email: z.string().email({ message: "Invalid email" }).trim().toLowerCase(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .max(30, { message: "password cannot be more than 30 characters" }),
});

export type UserType = z.infer<typeof userSchema>;
