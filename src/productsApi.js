import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://clothes-app-api.onrender.com/api';

export const fetchProducts = async (limit, cat) => {
    try {
        let url = `${BASE_URL}/products?limit=${limit}`;
        if (cat) {
            url += `&category=${cat}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
