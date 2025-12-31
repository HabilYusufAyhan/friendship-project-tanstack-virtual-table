import axios, { AxiosError } from 'axios';

import type { LoginFormData, SignupFormData } from '../types';

export const loginUser = async (data: LoginFormData) => {
  console.log(data);

  try {
    const response = await axios.post('https://dummyjson.com/user/login', data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || 'Giriş yapılamadı';
    }
    throw new Error('Beklenmeyen bir hata oluştu');
  }
};

export const signupUser = async (data: SignupFormData) => {
  try {
    const response = await axios.post('https://dummyjson.com/users/add', data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.message || 'Kayıt olunurken bir hata ile karşılaşıldı';
    }
    throw new Error('Beklenmeyen bir hata oluştu');
  }
};
