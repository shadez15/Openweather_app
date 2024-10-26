import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/alerts'; 


export const createAlert = async (alertData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, alertData);
        return response.data;
    } catch (error) {
        console.error('Error creating alert:', error);
        throw error;
    }
};

export const getAllAlerts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching alerts:', error);
        throw error;
    }
};

export const deleteAlert = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting alert:', error);
        throw error;
    }
};

export const checkAlerts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/check`);
        return response.data;
    } catch (error) {
        console.error('Error checking alerts:', error);
        throw error;
    }
};
