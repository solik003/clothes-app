import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2I4MjFlODMxZmM5MDA0ZjRlN2IxMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczMjU2OTU1OSwiZXhwIjoxNzMyODI4NzU5fQ.4e_PgUWcazMWdGUgVTrCVImSx2I8OLqwcT7rrosHrHk';

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token:`Bearer ${TOKEN}`},
});