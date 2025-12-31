import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigation = useNavigate();
  return (
    <button
      onClick={() => navigation('/')}
      className="cursor-pointer absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Ana Sayfaya Dön</span>
    </button>
  );
};

export default BackButton;
