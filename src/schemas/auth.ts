import { z } from "zod";

const fields = {
    email: z.string().email("需要是有效的邮箱地址"),
    username: z.string().min(3),
    password: z.string().min(6),
    phone: z.string().min(11).max(11)
}
/**
 * 登录
 */
const loginSchema = z.object({
    email: fields.username,
    password: fields.password
})

/**
 * 注册
 */
const registerSchema = z.object({
    username: fields.username,
    password: fields.password,
    email: fields.email.optional(),
    phone: fields.phone.optional()
})

/**
 * 忘记密码
 */
const forgotPasswordSchema = z.object({
    email: fields.email
})

/**
 * 重置密码
 */
const resetPasswordSchema = z.object({
    oldPassword: fields.password,
    password: fields.password,
})

/**
 * 修改资料
 */
export const updateProfileSchema = z.object({
    name: fields.username,
    email: fields.email,
    phone: fields.phone,
    // avatar: z.string().optional()
})

export { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema }