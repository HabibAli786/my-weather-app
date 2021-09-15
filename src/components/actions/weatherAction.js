export const set_input = (data) => {
    return {
        type: 'SET_INPUT',
        payload: data
    };
};

export const set_apiData = (json) => {
    return {
        type: 'SET_API_DATA',
        payload: json
    };
};

export const set_data = (data) => {
    return {
        type: 'SET_DATA',
        payload: data
    };
};

export const set_error = (error) => {
    return {
        type: 'SET_ERROR',
        payload: error
    };
};

