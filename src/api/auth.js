import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const spaceLogin = async (spaceLink, password) => {
  try {
    const response = await apiService.post(`api/auth`, '', {
      params: {
        link: spaceLink,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
