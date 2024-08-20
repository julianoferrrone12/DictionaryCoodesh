import axios from 'axios';
import axiosInstance from '../axiosConfig'

const API_URL = 'http://localhost:8081';

export const signup = async (credentials) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/auth/signup`, credentials);
        return response.data;
    } catch (error) {
        console.error('Signup failed', error);
        throw error;
    }
};


export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/auth/signin`, credentials);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};

export const getWords = async (search = '', page, limit = 8) => {
    try {
        const params = { page, limit };
        if (search) {
            params.search = search;
        }

        const response = await axiosInstance.get(`${API_URL}/entries/en`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
};

export const getWordDetails = async (word) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/entries/en/${word}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching word details:', error);
        throw error;
    }
};

export const favoriteWord = async (word) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/entries/en/${word}/favorite`);
        return response.data;
    } catch (error) {
        console.error('Failed to favorite word', error);
        throw error;
    }
};

export const unfavoriteWord = async (word) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/entries/en/${word}/unfavorite`);
        return response.data;
    } catch (error) {
        console.error('Failed to unfavorite word', error);
        throw error;
    }
};

export const getFavoritesWords = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/user/me/favorites`);
        console.log('API Response:', response.data);
        return response.data.results || [];
    } catch (error) {
        console.error('Failed to fetch favorites words', error);
        throw error;
    }
};


export const getVisitedWords = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/user/me/history`);
        console.log('API Response:', response.data);
        return response.data.results || [];
    } catch (error) {
        console.error('Failed to fetch history words', error);
        throw error;
    }
};

export const getMe = async (word) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/user/me`);
        return response.data;
    } catch (error) {
        console.error('Failed to load infos about me', error);
        throw error;
    }
};


