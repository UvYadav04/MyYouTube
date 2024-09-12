const usersreducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return state
        case 'UPDATE_USERS':
            // console.log(action.payload)
            return state = action.payload
        default:
            return state
    }
}


export default usersreducer