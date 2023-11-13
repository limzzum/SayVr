import Axios from "axios";
import API_URL from '../../config';

const axiosInstance = Axios.create({
    baseURL: `${API_URL}/user`,
    headers : {
        "Content-Type": "application/json",
    }
  });

  export const checkId = async (email) => {
    const response = await axiosInstance.get(`/idCheck/${email}`);
    return response;
  };
  export const checkNickname = async (nickname) => {
    const response = await axiosInstance.get(`/nicknameCheck/${nickname}`);
    return response;
  };

  export const signUp = async (formData) => {
    const response = await axiosInstance.post("",formData);
    return response;
  };
  
  export const login = async (formData) => {
    const response = await axiosInstance.post("/login",formData);
    return response;
  };