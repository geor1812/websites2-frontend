import axios from "axios";
import { toast } from "react-toastify";

export function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.defaults.baseURL = "http://ec2-54-86-95-38.compute-1.amazonaws.com:5000/";

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
