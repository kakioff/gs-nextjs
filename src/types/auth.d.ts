import { loginSchema, registerSchema } from "@/schemas/auth";
import { z } from "zod";

interface LoginFormType extends z.infer<typeof loginSchema> { }

interface RegisterFormType extends z.infer<typeof registerSchema> { }