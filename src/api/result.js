import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const submitRatings = async (requestBody, token) => {
  try {
    const response = await apiService.post(
      `api/Space/add-ratings`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
