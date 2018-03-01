import thunk from "redux-thunk";
import logger from "redux-logger";
import { loginStateReducer } from "./components/layout/login/login.reducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { StorageService } from "../core/services/storage.service";
import { Constants } from "../core/constants";
import throttle from "lodash/throttle"

const loadState = () => {
    try {
        let storage = StorageService.i();

        if(storage.itemIsExist(Constants.state)) {
            const serializedState = storage.getItem(Constants.state);
            return JSON.parse(serializedState);
        }
    } catch (error) {
        // log error.
    }
    return undefined;
}

const saveState = (state) => {
    try {
        let storage = StorageService.i();
        const serializedState = JSON.stringify(state);
        storage.setItem(Constants.state, serializedState);
    } catch (error) {
        // log error.
    }
}

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            loginState: loginStateReducer
        }),
        loadState(),
        composeEnhancers(
            applyMiddleware(
                thunk, 
                logger
            )
        )
    );

    store.subscribe(throttle(() => {
        saveState({
            loginState: store.getState().loginState
        })
    }, 1000));
    
    return store;
}

export default configureStore;