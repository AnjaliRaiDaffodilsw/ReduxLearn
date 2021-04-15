
const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

//action
const BUY_CAKE = 'BUY_CAKE';
const ICE_CREAM = 'ICE_CREAM';

//action creator
function buyCake() {
    return {
        type : BUY_CAKE,
        info : 'First redux action'
    }
}  
function buyIceCreams() {
    return {
        type : ICE_CREAM,
        info : 'First redux action'
    }
} 

//reducer
//(previousState,action) => newState

//initial state
// const initialState = {
//     numofCakes : 10,
//     numofIceCreams : 20
// }

const initialCakeState = {
    numofCakes : 10
}

const initialIceCreamState = {
    numofIceCreams : 20
}


// const reducer = (state = initialState,action) => {
//     switch(action.type) {
//         case BUY_CAKE : return {
//             ...state,
//             numofCakes : state.numofCakes - 1
//         }
//         case ICE_CREAM : return {
//             ...state,
//             numofIceCreams : state.numofIceCreams - 1
//         }

//         default : return state
//     }

// }
const cakeReducer = (state = initialCakeState,action) => {
    switch(action.type) {
        case BUY_CAKE : return {
            ...state,
            numofCakes : state.numofCakes - 1
        }

        default : return state
    }

}
const iceCreamreducer = (state = initialIceCreamState,action) => {
        switch(action.type) {
            case ICE_CREAM : return {
                ...state,
                numofIceCreams : state.numofIceCreams - 1
            }
    
            default : return state
        }
    
    }

    //making the root reducer which will combine both the rdeucer
const rootReducer = combineReducers ({
    cake : cakeReducer,
    iccream : iceCreamreducer
})

const store = createStore(rootReducer,applyMiddleware(logger));
console.log('Initial State',store.getState());
const unsubscribe = store.subscribe( () =>{});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());

unsubscribe();
