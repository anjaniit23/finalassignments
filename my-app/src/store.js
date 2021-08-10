
import { applyMiddleware, createStore,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
require("dotenv").config({path : "../../config.env"});

const initialState={};
var store;

const middleware=[thunk];

if(process.env.NODE_ENV === 'production') {
 
     store = createStore(
        rootReducer, 
        initialState,
         compose(
        applyMiddleware(...middleware)
    ));
}else{

     store = createStore( 
        rootReducer  ,
        initialState ,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )
        );//1st parameter is reducer
    
}

export default store;
