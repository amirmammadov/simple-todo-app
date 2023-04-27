import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  selectedTodo: null,
  errorCase: null,
};

export const todosReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    selectTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    getError: (state, action) => {
      state.errorCase = action.payload;
    },
  },
});

export const { getTodos, selectTodo, getError } = todosReducer.actions;
export default todosReducer.reducer;
