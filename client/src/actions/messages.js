import * as api from '../Api/api'
export const updatemessages = (messagedata) => async (dispatch) => {
    try {
        // console.log(messagedata)
        // console.log("updatemessages")
        // console.log(messagedata)
        const response = await api.updateMessage(messagedata)
        // console.log(response.data)
        dispatch({ type: 'NEW_MESSAGE', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

export const fetchmessages = () => async (dispatch) => {
    try {
        const messagesdata = await api.fetchallmessage()
        dispatch({ type: "UPDATE_MESSAGES", payload: messagesdata.data.messageslist })
    } catch (error) {
        console.log(error)
    }
}