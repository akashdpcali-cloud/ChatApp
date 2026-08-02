import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
const USER_API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`);

  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteAccount = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/delete-account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changeUsername = async (fullName) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${USER_API_URL}/change-username`,
    {
      fullName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const changeProfilePicture = async (image) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("profilePicture", image);

  const response = await axios.patch(
    `${USER_API_URL}/profile-picture`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/change-password`,
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
