// components/users/UserRow.tsx

import { Briefcase, Heart, Mail, MapPin, Phone, X } from 'lucide-react';

import type { UserData } from '../types/User';

interface Props {
  user: UserData;
  onMeet: (id: number, name: string) => void;
  onSkip: (id: number) => void;
  style?: React.CSSProperties;
}

export const UserRow = ({ user, onMeet, onSkip, style }: Props) => (
  <tr
    style={style}
    className="hover:bg-purple-50 transition flex items-center box-border relative py-2 "
  >
    <td className="px-6 text-left min-w-1/6 truncate">
      <div className="flex items-center flex-row gap-2">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-200"
        />
        <div>
          <h3 className="font-semibold text-gray-900 text-lg whitespace-nowrap">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500 whitespace-nowrap">
            {user.age} yaşında • {user.gender === 'female' ? 'Kadın' : 'Erkek'}
          </p>
          {/* <p className="text-xs text-purple-600">{user.bloodGroup}</p> */}
        </div>
      </div>
    </td>

    {/* Contact */}
    <td className="px-6  text-left min-w-1/6 truncate">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-purple-500" />
          <span className="truncate max-w-52">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-purple-500" />
          <span>{user.phone}</span>
        </div>
      </div>
    </td>

    {/* Location */}
    <td className="px-6  text-left min-w-1/6 truncate">
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 text-purple-500 mt-0.5" />
        <div>
          <p className="font-semibold">{user.address.city}</p>
          <p className="text-xs">
            {user.address.state}, {user.address.country}
          </p>
        </div>
      </div>
    </td>

    {/* Job */}
    <td className="px-6  text-left min-w-1/6 truncate">
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <Briefcase className="w-4 h-4 text-purple-500 mt-0.5" />
        <div>
          <p className="font-semibold">{user.company.title}</p>
          <p className="text-xs text-gray-500">{user.company.department}</p>
          <p className="text-xs text-purple-600 mt-1">{user.university}</p>
        </div>
      </div>
    </td>

    {/* Physical */}
    <td className="px-6  text-left min-w-1/6 truncate">
      <div className="text-sm text-gray-600">
        <p>
          <b>Boy:</b> {user.height.toFixed(0)} cm
        </p>
        <p>
          <b>Kilo:</b> {user.weight.toFixed(0)} kg
        </p>
        <p>
          <b>Göz:</b> {user.eyeColor}
        </p>
        <p>
          <b>Saç:</b> {user.hair.color}, {user.hair.type}
        </p>
      </div>
    </td>

    {/* Actions */}
    <td className="px-6  text-left min-w-1/6 truncate">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onMeet(user.id, `${user.firstName} ${user.lastName}`)}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105"
        >
          <Heart className="w-4 h-4" />
          <span className="font-semibold">Tanış</span>
        </button>
        <button
          onClick={() => onSkip(user.id)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          <X className="w-4 h-4" />
          <span className="font-semibold">Geç</span>
        </button>
      </div>
    </td>
  </tr>
);
