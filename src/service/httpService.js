import axios from "axios";
import { toast } from "react-toastify";

export function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    console.log("Interceptor called");
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("An unexpected error has occurred");
        console.log("Logging unexpected error", error);
    }
    return Promise.reject(error);
});

export default {
    get: axios.get,
    delete: axios.delete,
    post: axios.post,
    put: axios.put,
    setJwt
};
