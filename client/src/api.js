import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use(req => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});


API.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const redirectTo = error.response.data?.redirectTo;
            if (redirectTo) {
                localStorage.removeItem('token');
                window.location.href = redirectTo; 
            }
        }
        return Promise.reject(error); 
    }
);


export const login = (data) => API.post('/auth/login', data);
export const signup = (formData) => API.post('/auth/signup', formData);
export const getCars = () => API.get('/cars');
export const searchCars = (keyword) => API.get(`/cars/search?keyword=${keyword}`);
export const createCar = (data) => API.post('/cars', data);
export const updateCar = (id, data) => API.put(`/cars/${id}`, data);
export const deleteCar = (id) => API.delete(`/cars/${id}`);

export default API;
