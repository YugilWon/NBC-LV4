//중앙 데이터 관리소(store)를 설정하는 부분
// import { createStore, combineReducers } from "redux";
import posts from "../modules/addpost";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({});
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    posts,
    devTools: process.env.NODE_ENV !== "production",
  },
});

export default store;
