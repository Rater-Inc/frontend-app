import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const createSpace = async (spaceData) => {
  try {
    const response = await apiService.post(
      'api/space/create-space',
      spaceData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSpaceByLink = async (spaceLink, token) => {
  try {
    const response = await apiService.post(`api/space/get-space`, '', {
      params: {
        link: spaceLink,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRatings = async (spaceLink, token) => {
  try {
    const response = await apiService.post(`/api/space/space-result`, '', {
      params: {
        link: spaceLink,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
