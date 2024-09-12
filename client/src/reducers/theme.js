const themereducer = (state = "dark", action) => {
    switch (action.type) {
        case "settheme":
            return { ...state, theme: action.value }
        case "gettheme":
            return state
        default:
            return state
    }
}

export default themereducer