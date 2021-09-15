export const get_id = (city) => {
    return {
        type: 'GET_CITY_ID',
        payload: city
    };
};