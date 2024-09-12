const groupreducer = (state = [], action) => {
    switch (action.type) {
        case 'NEWGROUP':
            return [...state, action.payload];
        case 'FETCH_GROUPS':
            return [...action.payload];
        case 'GET_GROUPS_DATA':
            return state;
        default:
            return state;
    }
}

export default groupreducer