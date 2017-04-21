import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducer';

const promiseMiddleware = () => {
    return next => action => {
        if(typeof action !== 'undefined'){
            const { promise, type, ...rest } = action;
            if (!promise) return next(action);

            const SUCCESS = type;
            const REQUEST = `${type}_REQUEST`;
            const FAILURE = `${type}_FAILURE`;
            next({ ...rest, type: REQUEST });

            return promise.then(res => {
                next({ ...rest, res, type: SUCCESS });
                return true;
            }).catch(error => {
                next({ ...rest, error, type: FAILURE });
                console.log(error);
                return false;
            });
        }
        return false;
    };
};

const preloadedState = {};

const middleWare = [thunk, promiseMiddleware, createLogger()];

const store = createStore(reducer, preloadedState, applyMiddleware(...middleWare));

export default store;
