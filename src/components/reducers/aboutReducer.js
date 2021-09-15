const aboutReducer = (state = null, action) => {
    switch(action.type) {
        case 'GET_CITY_ID':
            return action.payload
        default:
            return state
    }
}

export default aboutReducer;