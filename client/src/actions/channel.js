import * as api from '../Api/api'

export const updatechannel = (id, authdata) => async (dispatch) => {
    try {
        const { data } = await api.updatechannel(id, authdata)
        // console.log(data.c)
        dispatch({ type: "UPDATE_CHANNEL", payload: data.c })
    }
    catch (error) {
        console.log(error)
    }
}


export const fethchannels = () => async (dispatch) => {
    try {
        const { data } = await api.fetchchannel()
        console.log(data)
        dispatch({ type: "FETCH_CHANNELS", payload: data })
    }
    catch (error) {
        console.log(error)
    }
}

