import * as api from '../Api/api'
import { updateusers } from './users'
export const newgroup = (newdata) => async (dispatch) => {
    try {
        const data = await api.newgroup(newdata)
        // console.log(data)
        dispatch({ type: 'NEWGROUP', payload: data.data.group })
    } catch (error) {
        console.log(error)
    }
}


export const fetchallgroups = () => async (dispatch) => {
    try {
        const data = await api.fetchallgroups()
        // console.log(data.data.groupdata)
        dispatch({ type: "FETCH_GROUPS", payload: data.data.groupdata })
        dispatch(updateusers())
    } catch (error) {
        console.log(error)
    }
}

export const getgroupdata = () => {
    return {
        type: "GET_GROUPS_DATA"
    }
}