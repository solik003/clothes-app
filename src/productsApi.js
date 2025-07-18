import axios from 'axios';
import { BASE_API_URL } from './config';

export const fetchProducts = async (limit, cat) => {
    try {
        let url = `${BASE_API_URL}/products?limit=${limit}`;
        if (cat) {
            url += `&category=${cat}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
