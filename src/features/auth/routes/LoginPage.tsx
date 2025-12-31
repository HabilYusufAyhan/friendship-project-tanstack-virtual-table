import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BackButton from '../components/BackButton';
import Branding from '../components/Branding';
import Button from '../components/Button';
import FormHeader from '../components/FormHeader';
import Input from '../components/Input';
import RememberMe from '../components/RememberMe';
import SocialLogin from '../components/SocialLogin';
import TabButtons from '../components/TabButtons';
import { createLoginSchema } from '../schemas/authSchema';
import { loginUser } from '../service/authService';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginFormData } from '../types/index';

function LoginPage() {
  const navigation = useNavigate();
  const { showPassword, setShowPassword, setUserStoreData } = useAuthStore();

  const isLogin: boolean = true;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema())
  });

  const submit = async (data: LoginFormData) => {
    const userData = await loginUser(data);
    if (userData) {
      setUserStoreData({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        image: userData.image
      });
      navigation('/user');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <BackButton />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <Branding isLogin={isLogin} />

        <div className="p-12 md:w-3/5">
          <TabButtons isLogin={isLogin} />
          <form onSubmit={handleSubmit(submit)} className="max-w-md mx-auto">
            <FormHeader isLogin={isLogin} />

            <div className="space-y-5">
              <Input
                label="Kullanıcı Adı"
                error={errors.username?.message}
                type="text"
                placeholder="Kullanıcı adınız"
                {...register('username')}
                icon={<User className="input-icon" />}
              />

              <Input
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                placeholder="*********"
                error={errors.password?.message}
                {...register('password')}
                icon={<Lock className="input-icon" />}
                button={{
                  type: 'button',
                  onClick: () => setShowPassword(!showPassword),
                  element: showPassword ? <EyeOff /> : <Eye />
                }}
              />

              <RememberMe />
              <Button isLogin={isLogin} type="submit" />
            </div>

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
