export const theme = (value) => {
    try {
        return {
            type: "settheme",
            value: value
        }
    }
    catch (error) {
        console.log(error)
    }
}