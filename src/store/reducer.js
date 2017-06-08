import { combineReducers } from 'redux';
import home from './../home/reducer';
import app from './../app/reducer';
import question from './../question/reducer';
import account from './../account/reducer';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
	home,
    app,
    question,
    account,
    routing: routerReducer
});

export default reducer;
