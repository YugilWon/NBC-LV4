import { createSlice } from "@reduxjs/toolkit";

const initialState = [{}];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      //불변성을 유지시켜야 한다!
      return [...state, action.payload];
      //redux toolkit 안에 inner 라는 기능이 내장되어 있기 때문!!!
      //   state.push(action.payload);
    },
    removePost: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //   switchTodo: (state, action) => {
    //     return state.map((item) => {
    //       if (item.id === action.payload) {
    //         return { ...item, isDone: !item.isDone };
    //       } else {
    //         return item;
    //       }
    //     });
    //   },
  },
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;
