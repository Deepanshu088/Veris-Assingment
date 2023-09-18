import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user/userSlice";

const userConfig = {
	key: "userData",
	storage,
};

const rootReducer = combineReducers({
	userData: persistReducer(userConfig, userReducer),
});

export default rootReducer;
