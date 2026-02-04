import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBlogs = async () => {
    const response = await api.get('/blogs/all');
    return response.data;
};

export const createBlog = async (blogData) => {
    const response = await api.post('/blogs/create', blogData);
    return response.data;
};

export const getBlogById = async (id, lang) => {
    const url = lang ? `/blogs/${id}?lang=${lang}` : `/blogs/${id}`;
    const response = await api.get(url);
    return response.data;
};

export default api;
