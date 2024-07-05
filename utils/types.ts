import { z } from "zod";
import { RegisterFormValidation } from "./validation";

export type RegisterFormValues = z.infer<typeof RegisterFormValidation>;