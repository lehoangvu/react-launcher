import { combineReducers } from 'redux';
import home from './../home/reducer';
import app from './../app/reducer';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
	home,
    app,
    routing: routerReducer
});

export default reducer;
