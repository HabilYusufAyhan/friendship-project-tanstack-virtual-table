import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import BackButton from '../components/BackButton';
import Branding from '../components/Branding';
import Button from '../components/Button';
import FormHeader from '../components/FormHeader';
import Input from '../components/Input';
import SocialLogin from '../components/SocialLogin';
import TabButtons from '../components/TabButtons';
import TermsCheckbox from '../components/TermsCheckbox';
import { createSignupSchema } from '../schemas/authSchema';
import { useAuthStore } from '../store/useAuthStore';
import type { SignupFormData } from '../types/index';

function SignupPage() {
  const { showPassword, setShowPassword } = useAuthStore();
  const isLogin: boolean = false;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(createSignupSchema())
  });

  const submit = (data: SignupFormData) => {
    console.log('SIGNUP DATA:', data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <BackButton />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <Branding isLogin={false} />

        <div className="p-12 md:w-3/5">
          <TabButtons isLogin={isLogin} />
          <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto">
            <FormHeader isLogin={false} />

            <div className="space-y-5">
              <Input
                label="Ad"
                type="text"
                placeholder="Adınız"
                error={errors.firstName?.message}
                {...register('firstName')}
                icon={<User className="input-icon" />}
              />
              <Input
                label="Soyad"
                type="text"
                placeholder="Soyadınız"
                error={errors.lastName?.message}
                {...register('lastName')}
                icon={<User className="input-icon" />}
              />
              <Input
                label="Kullanıcı Adı"
                type="text"
                placeholder="Kullanıcı acınız"
                error={errors.username?.message}
                {...register('username')}
                icon={<AtSign className="input-icon" />}
              />

              <Input
                label="E-posta"
                type="mail"
                placeholder="E postanız"
                error={errors.email?.message}
                {...register('email')}
                icon={<Mail className="input-icon" />}
              />

              <Input
                label="Şifre"
                placeholder="*************"
                type={showPassword ? 'text' : 'password'}
                error={errors.password?.message}
                button={{
                  type: 'button',
                  onClick: () => setShowPassword(!showPassword),
                  element: showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )
                }}
                {...register('password')}
                icon={<Lock className="input-icon" />}
              />

              <Input
                label="Şifre Tekrar"
                placeholder="**********"
                type={showPassword ? 'text' : 'password'}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
                icon={<Lock className="input-icon" />}
              />

              <TermsCheckbox />
              <Button isLogin={false} type="submit" />
            </div>

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
