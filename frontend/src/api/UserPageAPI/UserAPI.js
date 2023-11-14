import axiosInstance from "../constAPI/axiosInstance";

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

  export const logout = async () => {
    const response = await axiosInstance.post("user/logout");
    return response;
  };