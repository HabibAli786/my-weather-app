const init = {
    name: null,
    surname: null,
    address: null,
    phone: null,
    isSubmitted: false
}

const contactReducer = (state = init, action) => {
    switch(action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'SET_SURNAME':
            return {
                ...state,
                surname: action.payload
            }
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            }
        case 'SET_PHONE':
            return {
                ...state,
                phone: action.payload
            }
        case 'SET_SUBMITTED':
            return {
                ...state,
                isSubmitted: action.payload
            }
        default:
            return state
    }
}

export default contactReducer;