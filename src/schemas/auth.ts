import { z } from "zod";

const loginSchema = z.object({
    email: z.string().min(2, "需要是有效的邮箱地址"),
    password: z.string().min(6)
})

const registerSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    email: z.string().email().optional(),
    phone: z.string().min(11).max(11).optional() // optional,
})

const forgotPasswordSchema = z.object({
    email: z.string().email()
})

const resetPasswordSchema = z.object({
    password: z.string().min(6),
})

export { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema }