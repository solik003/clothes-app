import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async (limit, cat) => {
    try {
        let url = `${BASE_URL}/products?limit=${limit}`;
        if (cat) {
            url += `&category=${cat}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error; // Let the calling code handle the error
    }
};
