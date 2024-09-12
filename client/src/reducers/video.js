const video = (state = { data: [] }, actions) => {
    switch (actions.type) {
        case "UPLOAD_VIDEO":
            return { ...state }
        case "FETCH_VIDEOS":
            return { ...state, data: actions.payload }
        default:
            return state
    }
}

export default video