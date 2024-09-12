const activeuserreducer = (state = [], action) => {
    try {
        switch (action.type) {
            case 'ACTIVE_USERS':
                return state = action.payload;
            default:
                return state

        }
    } catch (error) {
        console.log(error)
    }
}

export default activeuserreducer