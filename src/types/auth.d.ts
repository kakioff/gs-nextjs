import { loginSchema, registerSchema, resetPasswordSchema, updateProfileSchema } from "@/schemas/auth";
import { z } from "zod";

interface LoginFormType extends z.infer<typeof loginSchema> { }

interface RegisterFormType extends z.infer<typeof registerSchema> { }

interface UpdateProfileFormType extends z.infer<typeof updateProfileSchema> { }

interface ResetPasswordFormType extends z.infer<typeof resetPasswordSchema> { }