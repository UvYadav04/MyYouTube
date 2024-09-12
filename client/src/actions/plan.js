import * as api from '../Api/api'
import { setcurrentuser } from './currentuser'

export const upgrade = (plan, id) => async (dispatch) => {
    try {
        // console.log(plan, id)
        let { data } = await api.upgradeplan(plan, id)
        console.log(data)
        let profile = JSON.parse(localStorage.getItem("Profile"))
        profile.result = { ...profile.result, subscription: data?.result?.subscription }
        data = profile
        localStorage.setItem("Profile", "Profile", JSON.stringify(profile))
        dispatch({ type: "AUTH", data })
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
        console.log(localStorage.getItem("Profile"))
    }
    catch (error) {
        console.log(error)
    }
}


export const checkvalidity = (id) => async (dispatch) => {
    try {
        let { data } = await api.checkvalidity(id)
        let profile = JSON.parse(localStorage.getItem("Profile"))
        profile.result = { ...profile.result, subscription: "free" }
        data = profile
        dispatch({ type: "AUTH", data })
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    }
    catch (error) {
        console.log(error)
    }
}