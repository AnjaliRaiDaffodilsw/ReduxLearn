const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');


const initialState = {
    laoding : false,
    users : [],
    errro : ''
}


//action 
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//action creator 


const fetchUsersRequest = () => {
    return  {
        type : FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return  {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}

const fetchUsersFailure = (error) => {
    return  {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}

//reducer
const reducer = (state = initialState,action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:{
            return {
                laoding : true
            }
        }

        case FETCH_USERS_SUCCESS : {
            return {
                loading : false,
                users : action.payload,
                error : ''
            }
        }

        case fetchUsersFailure : {
            return {
                loading : false,
                users : [],
                error : action.payload
            }
        }
    }
}


//async action creator

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest);
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            //response.data is the array of users
            const users = response.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users));
        })
        .catch (error => {
            //error.message is the error description
    
            dispatch(fetchUsersFailure(error.message));

        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe( () => {console.log(store.getState())});
store.dispatch(fetchUsers());

