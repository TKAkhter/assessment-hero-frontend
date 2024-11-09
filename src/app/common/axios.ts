import axios from "axios";
import { constants } from "./constants";

const axiosInstance = axios.create({
    // Todo: Remove the hardcoded URL
    baseURL: `${process.env.REACT_APP_API_URL ?? constants.REACT_APP_API_URL}/${process.env.REACT_APP_API_PATH ?? constants.REACT_APP_API_PATH}`
});

if (localStorage.token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
}

export default axiosInstance;