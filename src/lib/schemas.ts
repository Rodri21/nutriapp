import { z } from 'zod';

// Schema para registro de usuario
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  name: z.string().optional(),
});

// Schema para pacientes
export const patientSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  age: z.number().min(0).max(150),
  gender: z.enum(['M', 'F'], { message: 'Género requerido' }),
});

// Schema para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type PatientInput = z.infer<typeof patientSchema>;
export type LoginInput = z.infer<typeof loginSchema>;