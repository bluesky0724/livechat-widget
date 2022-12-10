import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001';

export const getIsSubmitted = () => {
    return localStorage.getItem("isSubmitted");
}

export const setIsSubmitted = (isSubmit) => {
    localStorage.setItem("isSubmitted", isSubmit);
}

export const getMachineId = () => {
    return localStorage.getItem("machineId");
}

export const saveUserInfoToLocalStorage = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export const getUserInfoFromLocalStorage = () => {
    if(localStorage.getItem("userInfo"))
        return JSON.parse(localStorage.getItem("userInfo"));
    else return {};
}

export const saveMachineId = (machineId) => {
    localStorage.setItem("machineId", machineId);
}

export const getChatHistory = async () => {
    const adminId = '1234';
    const machineId = getMachineId();
    const response = await axios.get(`${API_BASE_URL}/api/livechat/chathistory/${adminId}/${machineId}`);

    console.log("respose data is", response.data);
    return response.data;
}