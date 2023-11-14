import axios from "axios";
import API_URL from '../../config';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const checkId = async (email) => {
    const response = await axiosInstance.get(`/user/idCheck/${email}`);
    return response;
  };
  export const checkNickname = async (nickname) => {
    const response = await axiosInstance.get(`/user/nicknameCheck/${nickname}`);
    return response;
  };

  export const signUp = async (formData) => {
    const response = await axiosInstance.post("/user",formData);
    return response;
  };
  
  export const login = async (formData) => {
    const response = await axiosInstance.post("user/login",formData);
    return response;
  };
