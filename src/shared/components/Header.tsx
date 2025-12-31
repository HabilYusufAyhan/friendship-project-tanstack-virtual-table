import { User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store/useAuthStore';

export default function Header() {
  const navigation = useNavigate();
  const { userStoreData } = useAuthStore();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ConnectMe
          </h1>
        </div>
        <div className="flex gap-4">
          {userStoreData ? (
            <div className="flex gap-2 cursor-pointer px-6 py-2 font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent rounded-lg hover:opacity-80 transition">
              <div className="flex flex-col items-end justify-end">
                <span>{userStoreData.firstName + ' ' + userStoreData.lastName}</span>
                <span>{userStoreData.email}</span>
              </div>

              <div className="flex justify-end items-center ">
                <User className="text-pink-600" />
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigation('/login')}
                className="cursor-pointer px-6 py-2 font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent rounded-lg hover:opacity-80 transition"
              >
                Giriş Yap
              </button>

              <button
                onClick={() => navigation('/signup')}
                className="cursor-pointer px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Kayıt Ol
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
