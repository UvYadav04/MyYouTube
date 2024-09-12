import * as api from '../Api/api'
export const updateusers = () => async (dispatch) => {
    try {
        // console.log("line4")
        const allusers = await api.getallusers()
        // console.log(allusers.data.users)
        dispatch({ type: 'UPDATE_USERS', payload: allusers.data.users })
    } catch (error) {
        console.log(error)
    }
}

export const getallusers = () => {
    return {
        type: "GET_ALL_USERS"
    }
}



export const getactiveusers = () => async (dispatch) => {
    try {
        const activeusersdata = await api.getactiveusers()
        // console.log(activeusersdata.data.allactives)
        dispatch({ type: "ACTIVE_USERS", payload: activeusersdata.data.allactives })
    }
    catch (error) {
        console.log(error)
    }
}