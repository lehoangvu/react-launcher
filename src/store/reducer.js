import { combineReducers } from 'redux';
import list from './../list/reducer';
import app from './../app/reducer';

const reducer = combineReducers({
	list,
    app
});

export default reducer;
