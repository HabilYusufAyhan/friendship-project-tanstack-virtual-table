import { z } from 'zod';

export const createSignupSchema = () => {
  return z
    .object({
      firstName: z
        .string()
        .min(2, 'Adınız en az 2 karakter olmalıdır.')
        .max(50, 'Adınız en fazla 50 karakter olmalıdır.')
        .regex(/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/, 'Adınız sadece harflerden oluşabilir.'),
      lastName: z
        .string()
        .min(2, 'Adınız en az 2 karakter olmalıdır.')
        .max(50, 'Adınız en fazla 50 karakter olmalıdır.')
        .regex(/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]+$/, 'Adınız sadece harflerden oluşabilir.'),
      email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
      username: z
        .string()
        .min(2, 'Kullanıcı adınız en az 2 karakter olmalıdır.')
        .max(25, 'Kullanıcı adınız en fazla 25 karakter olmalıdır.'),
      password: z
        .string()
        .min(6, 'Şifreniz en az 6 karakter olmalıdır.')
        .max(20, 'Şifreniz en fazla 20 karakter olmalıdır.')
        // .regex(/[A-Z]/, 'Şifrenizde en az bir büyük harf bulunmalıdır.')
        .regex(/[a-z]/, 'Şifrenizde en az bir küçük harf bulunmalıdır.'),
      // .regex(/[0-9]/, 'Şifrenizde en az bir rakam bulunmalıdır.')
      // .regex(/[\W_]/, 'Şifrenizde en az bir özel karakter bulunmalıdır.'),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Şifreler eşleşmeli',
      path: ['confirmPassword']
    });
};
export const createLoginSchema = () => {
  return z.object({
    username: z
      .string()
      .min(2, 'Kullanıcı adınız en az 2 karakter olmalıdır.')
      .max(25, 'Kullanıcı adınız en fazla 25 karakter olmalıdır.'),
    password: z
      .string()
      .min(6, 'Şifreniz en az 6 karakter olmalıdır.')
      .max(20, 'Şifreniz en fazla 20 karakter olmalıdır.')
      // .regex(/[A-Z]/, 'Şifrenizde en az bir büyük harf bulunmalıdır.')
      .regex(/[a-z]/, 'Şifrenizde en az bir küçük harf bulunmalıdır.')
    // .regex(/[0-9]/, 'Şifrenizde en az bir rakam bulunmalıdır.')
    // .regex(/[\W_]/, 'Şifrenizde en az bir özel karakter bulunmalıdır.')
  });
};
