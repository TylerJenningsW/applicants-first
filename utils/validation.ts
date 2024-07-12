import { z } from 'zod'

export const RegisterFormValidation = z
  .object({
    firstName: z
      .string()
      .min(2, 'First Name must be at least 2 characters')
      .max(50, 'First Name must be at most 50 characters'),
    lastName: z
      .string()
      .min(2, 'Last Name must be at least 2 characters')
      .max(50, 'Last Name must be at most 50 characters'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be at most 15 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
