import React from 'react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  button?: {
    type: 'button' | 'submit' | 'reset';
    onClick: () => void;
    element: React.ReactNode;
  };

  error?: string;
}

const Input = ({ label, type, placeholder, icon, button, error, ...props }: InputProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <label className="block text-sm font-semibold text-gray-700 ">{label}</label>
      </div>
      <div className="relative">
        <input
          type={type}
          {...props}
          placeholder={placeholder}
          className={`w-full pl-5 pr-12 py-3 border-2 rounded-xl focus:outline-none transition ${
            error ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
          }`}
        />
        {button && (
          <button
            type={button.type}
            onClick={button.onClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {button.element}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
