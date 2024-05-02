import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email("This is not a valid email."),
  password: z
    .string()
    .refine(
      (value) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value ?? ""),
      "Password must have at least 8 characters, have at least a digit and at least an Upper case letter"
    ),
  currency: z.string().min(1, { message: "Currency is required" }),
  country: z.string().min(1, { message: "Country name is required" }),
});

export const obtainTokenSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email("This is not a valid email."),
  password: z
    .string()
    .refine(
      (value) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value ?? ""),
      "Password must have at least 8 characters, have at least a digit and at least an Upper case letter"
    ),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email("This is not a valid email."),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .refine(
      (value) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value ?? ""),
      "Password must have at least 8 characters, have at least a digit and at least an Upper case letter"
    ),
});
export const sendBankSchema = z.object({
  bank: z.string().min(1, { message: "Select bank" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  amount_to_send: z.string().min(1, { message: "Enter amount to send" }),
});

// {
//   "error": "password must have at least 8 characters, have at least a digit and at least an Upper case letter"
// }
