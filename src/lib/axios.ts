import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://kimdongju.site/api",     
    withCredentials: true,
});
