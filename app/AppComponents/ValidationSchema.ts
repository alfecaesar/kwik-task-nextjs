import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email!" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


export const signUpSchema = authSchema
    .extend({
        firstName: z.string().min(1, { message: "Please enter your first name!" }),
        lastName: z.string().min(1, { message: "Please enter your last name!" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })