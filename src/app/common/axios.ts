import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PATH}`
});

if (localStorage.token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}

export default axiosInstance;