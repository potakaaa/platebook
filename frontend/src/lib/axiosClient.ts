import axios from 'axios';
import { getSession } from 'next-auth/react';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
    }
}

export const axiosClient = axios.create({
    baseURL: process.env.DJANGO_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosClient.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});