import homeReducer from './reducers/HomeReducer';
import aboutReducer from './reducers/aboutReducer';
import weatherReducer from './reducers/weatherReducer';
import contactReducer from './reducers/contactReducer'
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    count : homeReducer,
    city_id : aboutReducer,
    weather : weatherReducer,
    contact : contactReducer
})

export default rootReducers;
