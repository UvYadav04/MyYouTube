import * as api from '../Api/api'
import { setcurrentuser } from './currentuser'
import { getactiveusers, updateusers } from './users'
export const login = (authdata) => async (dispatch) => {
    try {
        let { data } = await api.login(authdata)
        // console.log(data)
        dispatch({ type: "AUTH", data: data })
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
        dispatch(updateusers())
        dispatch(getactiveusers())
    } catch (error) {
        alert(error)
    }
}


export const sendotp = ({ email }) => async (dispatch) => {
    try {
        console.log(email)
        const data = await api.sendotp({ email: email })
        console.log(data)
        if (data?.data?.success)
            dispatch({ type: "Success", otp: data.data.otp })
        else
            dispatch({ type: "Failed" })
    } catch (error) {
        dispatch({ type: "Failed" })
    }
}