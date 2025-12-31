import { useNavigate } from 'react-router-dom';

const TabButtons = ({ isLogin }: { isLogin: boolean }) => {
  const navigation = useNavigate();

  return (
    <div className="flex gap-4 mb-8">
      <button
        type="button"
        onClick={() => navigation('/login')}
        className={`cursor-pointer flex-1 py-3 rounded-xl font-semibold transition ${
          isLogin
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Giriş Yap
      </button>
      <button
        type="button"
        onClick={() => navigation('/signup')}
        className={`cursor-pointer flex-1 py-3 rounded-xl font-semibold transition ${
          !isLogin
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Kayıt Ol
      </button>
    </div>
  );
};

export default TabButtons;
