const messagereducer = (state = {}, action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            // console.log(action.payload)
            const groupName = action.payload.messagelist.Group;
            const newMessages = action.payload.messagelist.Messages;
            // newMessages.sender = "dineshyadav"
            // console.log(newMessages)
            // // Ensure newMessages is an array of message objects
            if (Array.isArray(newMessages)) {
                // console.log('yess')
                state = {
                    ...state,
                    [groupName]: newMessages,
                };
                // console.log(state)
                return state
            } else {
                console.error('Expected newMessages to be an array:', newMessages);
                return state;
            }
        case 'UPDATE_MESSAGES':
            action.payload?.map((item) => state[item.Group] = item.Messages)
            return state

        default:
            return state;
    }
};

export default messagereducer;
