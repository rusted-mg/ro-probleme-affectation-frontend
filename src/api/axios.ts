import axios from "axios";

export const API = axios.create({
    baseURL: import.meta.env.BACKEND_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});