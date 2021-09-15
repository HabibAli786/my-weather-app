const init = {
    input: null,
    api: null,
    data: null,
    error: false
}

const weatherReducer = (state = init, action) => {
    switch(action.type) {
        case 'SET_INPUT':
            return {
                ...state,
                input: action.payload
            }
        case 'SET_API_DATA':
            return {
                ...state,
                api: action.payload
            }
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default weatherReducer;