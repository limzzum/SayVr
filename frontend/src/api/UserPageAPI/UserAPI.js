import axiosInstance from "../constAPI/axiosInstance";

  export const logout = async () => {
    const response = await axiosInstance.post("user/logout");
    return response;
  };