import axios from 'axios'
export const BASE_URL = 'http://146.70.88.25:8082/api/v1/'

export const USER_URL = 'http://localhost:8082/api/user';
export const USER_BASE_REST_API_URL= "http://localhost:8082/api/user"

class userService{

    
    getAllUser(page=0, size=5){
        return axios.get(`${USER_BASE_REST_API_URL}?page=${page}&size=${size}`,)
    }
    createUser(appUserData){
        return axios.post(USER_BASE_REST_API_URL, appUserData)
    }
    
    
}

export default new userService();