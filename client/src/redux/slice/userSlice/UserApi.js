import axios from "axios";
import queryString from "query-string";

export function UserApiLoader(){
    return new Promise(async (resolve, reject) => {
        const result = await axios.get('http://localhost:4000/', {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, user} = result.data;

        if(error){
            if(error.message === "there is wrong user id in token"){
                return resolve({state: {auth: false, show: false}});
            }
            return resolve({state: {auth: false, show: false}});
        }
        if(errorMessage){
            if(errorMessage === "user don't loggned"){
                return resolve({state: {auth: false, show: true}});
            }
            return resolve({state: {auth: false, show: true, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {...user, show: true, auth: true}});
        }

        return resolve({state: {auth: false, show: true}});
    })
};
export function UserLoginApiLoader(data){
    return new Promise(async (resolve, reject) => {
        const result = await axios.post('http://localhost:4000/auth/login', data, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, user, token} = result.data;
        if(error){
            return resolve({state: {auth: false, show: true}});
        }
        if(errorMessage){
            return resolve({state: {auth: false, show: true, errorMessage}});
        }
        if(succesMessage){
            if(document.location.search){
                const search = queryString.parse(document.location.search);
                if(search.redirect){
                    setTimeout(()=>{
                        document.location.href = search.redirect;
                    }, 1500);
                }else{
                    setTimeout(()=>{
                        document.location.href = "/";
                    }, 1500);  
                }
            }
            localStorage.setItem("token", token);
            return resolve({state: {...user, show: true, auth: true, token, succesMessage}});
        }
        return resolve({state: {auth: false, show: true}});
    })
};
export function UserRegisterApiLoader(data){
    return new Promise(async (resolve, reject) => {
        const result = await axios.post('http://localhost:4000/auth/register', data, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, user} = result.data;
        if(error){
            return resolve({state: {auth: false, show: true}});
        }
        if(errorMessage){
            return resolve({state: {auth: false, show: true, errorMessage}});
        }
        if(succesMessage){
            setTimeout(()=>{
                document.location.href = "/signin";
            }, 1500);
            return resolve({state: {show: true, auth: false, succesMessage}});
        }
        return resolve({state: {auth: false, show: true}});
    })
};
export function UserLogoutApiLoader(data){
    return new Promise(async (resolve, reject) => {
        const result = await axios.get('http://localhost:4000/auth/logout', {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, user} = result.data;
        if(error){
            return resolve({state: {auth: false, show: true}});
        }
        if(errorMessage){
            return resolve({state: {auth: false, show: true, errorMessage}});
        }
        if(succesMessage){
            localStorage.removeItem("token");
            return resolve({state: {auth:false, show: true, succesMessage}});
        }
        return resolve({state: {auth: false, show: true}});
    })
};
export function UpdateUserApiLoader(data){
    return new Promise(async (resolve, reject) => {
        const result = await axios.post('http://localhost:4000/auth/update', data, {headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + localStorage.getItem("token")}});
        const {error, errorMessage, succesMessage, user} = result.data;

        if(error){
            return resolve({state: {auth: false, show: true}});
        }
        if(errorMessage){
            return resolve({state: {auth: false, show: true, errorMessage}});
        }
        if(succesMessage){
            return resolve({state: {...user, show: true, auth: true, succesMessage}});
        }
        return resolve({state: {auth: false, show: true}});
    })
};