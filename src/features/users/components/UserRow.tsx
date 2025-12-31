import { Briefcase, Heart, Mail, MapPin, Phone, X } from 'lucide-react';
import { forwardRef } from 'react';

import type { UserData } from '../types/User';

interface Props {
  user: UserData;
  style?: React.CSSProperties;
  dataIndex?: number; // virtualizer için
}

export const UserRow = forwardRef<HTMLTableRowElement, Props>(({ user, style, dataIndex }, ref) => (
  <tr
    key={user.id}
    ref={ref}
    style={style}
    data-index={dataIndex}
    className="hover:bg-purple-50 transition-colors border-b border-gray-100 absolute top-0 left-0 w-full table table-fixed"
  >
    {/* Profil */}
    <td className="px-4 md:px-6 py-3 md:py-4 text-left">
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-purple-200 shrink-0"
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-base md:text-sm truncate">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500">
            {user.age} yaşında • {user.gender === 'female' ? 'Kadın' : 'Erkek'}
          </p>
        </div>
      </div>
    </td>

    {/* İletişim */}
    <td className="px-4 md:px-6 py-3 md:py-4 text-left">
      <div className="space-y-1">
        <div className="flex items-center justify-start gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-purple-500 shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center justify-start gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-purple-500 shrink-0" />
          <span>{user.phone}</span>
        </div>
      </div>
    </td>

    {/* Adres */}
    <td className="px-4 md:px-6 py-3 md:py-4 text-left ">
      <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
        <MapPin className="w-4 h-4 text-purple-500 mt-1 shrink-0 md:order-2" />
        <div className="text-left ">
          <p className="font-semibold">{user.address.city}</p>
          <p className="text-xs">{user.address.country}</p>
        </div>
      </div>
    </td>

    {/* İş & Eğitim */}
    <td className="px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Briefcase className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
        <div className="min-w-0">
          <p className="font-semibold truncate">{user.company.title}</p>
          <p className="text-xs text-gray-500 truncate">{user.company.department}</p>
          <p className="text-xs text-purple-600 mt-1 truncate">{user.university}</p>
        </div>
      </div>
    </td>

    {/* Fiziksel */}
    <td className="px-4 md:px-6 py-3 md:py-4 ">
      <div className="text-sm text-gray-600 space-y-0.5">
        <p className="flex flex-nowrap justify-start ">
          <span className="font-semibold">Boy:</span>
          <span className="ml-1">{user.height} cm</span>
        </p>
        <p className="flex flex-nowrap justify-start ">
          <span className="font-semibold">Kilo:</span>
          <span className="ml-1">{user.weight} kg</span>
        </p>
        <p className="flex flex-nowrap justify-start ">
          <span className="font-semibold">Göz:</span>
          <span className="ml-1">{user.eyeColor}</span>
        </p>
        <p className="flex flex-nowrap justify-start ">
          <span className="font-semibold">Saç:</span>
          <span className="ml-1">{user.hair.color}</span>
        </p>
      </div>
    </td>

    {/* İşlemler */}
    <td className="px-4 md:px-6 py-3 md:py-4 text-left">
      <div className="flex items-center justify-start md:justify-end gap-2">
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 text-sm">
          <Heart className="w-4 h-4 shrink-0" />
          <span className="font-semibold">Tanış</span>
        </button>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm">
          <X className="w-4 h-4 shrink-0" />
          <span className="font-semibold">Geç</span>
        </button>
      </div>
    </td>
  </tr>
));
