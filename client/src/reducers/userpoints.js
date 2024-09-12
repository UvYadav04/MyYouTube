const pointreducer = (state = { points: 0 }, action) => {
    switch (action.type) {
        case "CHECKPOINTS":
            return { ...state, points: action.payload }
        case "GETPOINTS":
            return state;
        default:
            return state
    }
}


export default pointreducer