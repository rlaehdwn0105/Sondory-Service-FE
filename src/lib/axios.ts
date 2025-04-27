import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://kimdongju.site/api",     
    withCredentials: true,
});
