const otpreducer = (state = { status: null, otp: null }, action) => {
    switch (action.type) {
        case "Success":
            return { status: true, otp: action.otp }
        case "Failed":
            return { status: false }
        case "Reset":
            return { status: null, otp: null }
        default:
            return state
    }
}

export default otpreducer