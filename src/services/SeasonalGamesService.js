import axios from "axios";

export const getUsersToken = (data) => {
    return axios.post(`https://api-teams.chatdaddy.tech/token`, data);
}

export const getTagsList = (token) => {
    return axios.get(`https://api-im.chatdaddy.tech/tags`, { headers: { "Authorization": `Bearer ${token}` } });
}

export const getContactList = (url, token) => {
    return axios.get(`https://api-im.chatdaddy.tech/${url}`, { headers: { "Authorization": `Bearer ${token}` } });
}