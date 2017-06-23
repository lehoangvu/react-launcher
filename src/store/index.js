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

            return promise.then(response => {
                let forwardData = { ...rest, type: action.type};
                if(typeof action.data_field_name !== 'undefined') {
                    forwardData[action.data_field_name] = response.data;
                } else {
                    forwardData['data'] = response.data;
                }
                console.log('__', action.type);
                next(forwardData);
                return true;
            }).catch(error => {
                let failType = action.type.replace('SUCCESS', 'FAIL');
                next({ ...rest, error, type: failType });
                return false;
            });
        }
        return false;
    };
};

const middleWare = [thunk, promiseMiddleware];

if(typeof process.env.LOG_ENABLE !== 'undefined') {
    middleWare.push(createLogger());
}


const initStore = (preload = {}) => {
    console.log(preload);
    const store = createStore(reducer, preload, applyMiddleware(...middleWare));
    return store;
};

export default initStore;