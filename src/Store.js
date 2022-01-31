import {applyMiddleware, createStore} from "redux";
import rootReducer from "./Reducer/rootReducer";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

const Store = createStore(rootReducer,{},applyMiddleware(thunk,logger));

export default Store;