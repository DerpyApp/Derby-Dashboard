import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
//  Zod Validation Schemas — Auth Domain
// ─────────────────────────────────────────────────────────────

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

// ── Login ─────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email or Username is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

// ── Register ──────────────────────────────────────────────────
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(60, 'Full name is too long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^\+?[0-9\s\-()]+$/, 'Please enter a valid phone number'),
    password: passwordSchema,
    confirmPassword: z.string().optional(),
    terms: z.boolean().optional(),
  })
  .refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

// ── Forgot Password ───────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// ── OTP Verification ──────────────────────────────────────────
export const otpSchema = z.object({
  otp: z
    .string()
    .min(4, 'OTP must be at least 4 digits')
    .max(6, 'OTP must be at most 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

// ── Reset Password ────────────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
