import { UpdateUserApiLoader, UserApiLoader, UserLoginApiLoader, UserLogoutApiLoader, UserRegisterApiLoader } from "./UserApi";

export function user(state={}, action){
    if(action.type === "setUser"){
        return {
            ...action.payload
        }
    }
    return state;
}

export const initalUser = {
    show: false,
    auth: undefined
};

function setUser(user){
    return {
        type: "setUser",
        payload: user
    }
}

export function GetStateApi(){
    return (dispatch, getState)=>{
        return UserApiLoader().then((res)=>{
            dispatch(setUser(res.state));
        })
    }
}
export function UserLoginApi(data){
    return (dispatch, getState)=>{
        return UserLoginApiLoader(data).then((res)=>{
            dispatch(setUser(res.state));
        })
    }
}
export function UserRegisterApi(data){
    return (dispatch, getState)=>{
        return UserRegisterApiLoader(data).then((res)=>{
            dispatch(setUser(res.state));
        })
    }
}
export function UserLogoutApi(){
    return (dispatch, getState)=>{
        return UserLogoutApiLoader().then((res)=>{
            dispatch(setUser(res.state));
        })
    }
}
export function UpdateUserApi(data){
    return (dispatch, getState)=>{
        return UpdateUserApiLoader(data).then((res)=>{
            dispatch(setUser(res.state));
        })
    }
}