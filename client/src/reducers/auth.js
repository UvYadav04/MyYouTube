const authreducer = (state = { data: null }, actions) => {
    switch (actions.type) {
        case "AUTH":
            // console.log(actions.data)
            // console.log(actions.data)
            localStorage.setItem("Profile", JSON.stringify({ ...actions?.data }));
            // console.log(JSON.pa  rse(localStorage.getItem("Profile")))
            return { ...state, data: actions?.data }
        default:
            return state;
    }
}

export default authreducer;