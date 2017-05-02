import { combineReducers } from 'redux';
import home from './../home/reducer';
import app from './../app/reducer';

const reducer = combineReducers({
	home,
    app
});

export default reducer;
