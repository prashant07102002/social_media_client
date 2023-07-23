import axios from "axios"
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./localstorageManage"
// import store from '../redux/store'
// import { showToast } from "../redux/slices/appConfigSlice"
// import { TOAST_FAILURE } from "../App"

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,

})

axiosClient.interceptors.request.use(
    (request) => {
        // console.log(request)
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        // console.log("access token is", accessToken)
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        // console.log("the request is ", request)
        return request;
    }
)

axiosClient.interceptors.response.use(
    async (response) => {
        // console.log("the resoponse is ", response)
        const data = response.data;
        // console.log("the data we are getting in response ", data);
        // console.log("status of the data", data.status);
        if (data.status === "Ok") {
            // console.log('it is ok');
            // setItem(KEY_ACCESS_TOKEN, data.result.accessToken)
            return data;
        }
        const originalrequest = response.config;
        // console.log(originalrequest.url);
        const statusCode = data.statusCode;
        // console.log(statusCode);
        const error = data.message;
        if (statusCode === 401 && !originalrequest._retry) {
            originalrequest._retry = true;
            const response = await axios.create({
                withCredentials: true,
            }).get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`);
            // console.log("after calling refresh api response is ", response.data.status);
            // console.log('after calling refresh api response result is ', response.data.result);

            if (response.data.status === 'Ok') {
                // console.log('hello from axios')
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken)
                // console.log('response from the bd', response.data.result.accessToken);
                originalrequest.headers["Authorization"] = `Bearer ${response.data.result.accessToken}`;
                // console.log("calling again the original request with new access key", originalrequest);
                return axios(originalrequest);
            }
            else {
                removeItem(KEY_ACCESS_TOKEN)
                window.location.replace("/login", "_self")
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }, async (error) => {
        return Promise.reject(error);
    }
)
