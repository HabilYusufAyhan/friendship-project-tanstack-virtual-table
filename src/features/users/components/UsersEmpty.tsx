// components/users/UsersEmpty.tsx
import { Users } from 'lucide-react';

interface UsersEmptyProps {
  isLoading: boolean;
}

export const UsersEmpty = ({ isLoading }: UsersEmptyProps) => (
  <div className="w-full flex items-center justify-center">
    <div className="px-6 py-12 text-center text-gray-500">
      <div>
        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-lg font-semibold">
          {isLoading ? 'Kullanıcılar aranıyor...' : 'Kullanıcı bulunamadı'}
        </p>
        {!isLoading ? <p className="text-sm">Arama kriterlerinizi değiştirin</p> : ''}
      </div>
    </div>
  </div>
);
