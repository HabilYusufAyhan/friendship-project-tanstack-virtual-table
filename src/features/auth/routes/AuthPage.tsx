import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import BackButton from '../components/BackButton';
import Branding from '../components/Branding';
import FormHeader from '../components/FormHeader';
import Input from '../components/Input';
import RememberMe from '../components/RememberMe';
import SocialLogin from '../components/SocialLogin';
import SubmitButton from '../components/SubmitButton';
import TabButtons from '../components/TabButtons';
import TermsCheckbox from '../components/TermsCheckbox';
import { createAuthSchema } from '../schemas/authSchema';
import { useAuthStore } from '../store/useAuthStore';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
function AuthPage() {
  const { isLogin, setIsLogin, showPassword, setShowPassword } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    resolver: zodResolver(createAuthSchema())
  });

  const submit = (data: AuthFormData) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <BackButton />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <Branding isLogin={isLogin} />

        <div className="p-12 md:w-3/5">
          <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto">
            <TabButtons isLogin={isLogin} onTabChange={setIsLogin} />
            <FormHeader isLogin={isLogin} />

            <div className="space-y-5">
              {!isLogin && (
                <Input
                  label="Ad Soyad"
                  type="text"
                  error={errors.name?.message}
                  {...register('name')}
                  icon={
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  }
                  placeholder="Adınız ve soyadınız"
                />
              )}

              <Input
                label="E-posta"
                type="email"
                error={errors.email?.message}
                {...register('email')}
                icon={
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                }
                placeholder="ornek@email.com"
              />

              <Input
                label="Şifre"
                error={errors.password?.message}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                icon={
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                }
                placeholder="••••••••"
                button={{
                  type: 'button',
                  onClick: () => setShowPassword(!showPassword),
                  element: showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )
                }}
              />

              {!isLogin && (
                <Input
                  label="Şifre Tekrar"
                  error={errors.confirmPassword?.message}
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  icon={
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  }
                  placeholder="••••••••"
                />
              )}

              {isLogin && <RememberMe />}
              {!isLogin && <TermsCheckbox />}

              <SubmitButton isLogin={isLogin} type="submit" />
            </div>

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
