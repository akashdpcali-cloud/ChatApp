import axios from "axios";

const API_URL = "http://localhost:5000/api/chats";


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
        "http://localhost:5000/api/chats/one-to-one-chat",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const getGroups = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:5000/api/groups",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};


export const searchUsers = async (query) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `http://localhost:5000/api/users/search?query=${encodeURIComponent(query)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};


export const createChat = async (userId) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:5000/api/chats",
        {
            userId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};


export const createGroup = async (groupName, memberIds) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:5000/api/groups",
        {
            groupName,
            memberIds,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;

};