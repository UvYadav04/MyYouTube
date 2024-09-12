const channelreducer = (state = [], action) => {
    try {
        switch (action.type) {
            case "UPDATE_DATA":
                return state.map(s => s._id == action.payload._id ? action.payload : state)
            case "FETCH_CHANNELS":
                return action.payload
            default:
                return state
        }
    }
    catch (error) {
        console.log(error)
    }
}

export default channelreducer