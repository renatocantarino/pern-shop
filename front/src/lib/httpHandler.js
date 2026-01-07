import axios from "axios";

const httpHandler = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    withCredentials: true,

});

export default httpHandler;