export const set_name = (name) => {
    return {
        type: 'SET_NAME',
        payload: name
    };
};

export const set_surname = (surname) => {
    return {
        type: 'SET_SURNAME',
        payload: surname
    };
};

export const set_address = (address) => {
    return {
        type: 'SET_ADDRESS',
        payload: address
    };
};

export const set_phone = (phone) => {
    return {
        type: 'SET_PHONE',
        payload: phone
    };
};

export const set_submitted = (value) => {
    return {
        type: 'SET_SUBMITTED',
        payload: value
    };
};

