import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const passwordStrengthRegex = {
    hasNumber: /\d/,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

export function calculatePasswordStrength(password: string): number {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (passwordStrengthRegex.hasNumber.test(password)) strength++;
    if (passwordStrengthRegex.hasUpperCase.test(password)) strength++;
    if (passwordStrengthRegex.hasLowerCase.test(password)) strength++;
    if (passwordStrengthRegex.hasSpecialChar.test(password)) strength++;

    return strength;
}

export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    consent: z.boolean().refine(val => val === true, {
        message: 'You must consent to the data processing',
    }),
});