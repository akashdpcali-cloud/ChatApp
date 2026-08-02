import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/chats`;

export const getAllChats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOneToOneChats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/chats/one-to-one-chat`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getGroups = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/groups`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const searchUsers = async (query) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users/search?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const createChat = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/chats`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const createGroup = async (groupName, memberIds) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/groups`,
    {
      groupName,
      memberIds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getChatMessages = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/chats/${chatId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const sendMessage = async (chatId, content) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/chats/${chatId}/messages`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getBlockedChats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/chats/blocked`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const blockChat = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/chats/${chatId}/block`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const unblockChat = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/chats/${chatId}/block`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const clearChat = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/chats/${chatId}/clear-chat`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const deleteChat = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/chats/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const deleteGroup = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/groups/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
