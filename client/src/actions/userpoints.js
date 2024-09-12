import * as api from '../Api/api'
import { login } from './auth'
export const checkpoints = (authdata) => async (dispatch) => {
    try {
        const { data } = await api.checkpoints(authdata)
        // console.log(data)
        dispatch({ type: 'CHECKPOINTS', payload: data.usr.points })
        dispatch(login({ email: data.usr.email }))
    }
    catch (error) {
        console.log(error)
    }
}