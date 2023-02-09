import { configureStore } from '@reduxjs/toolkit';
import { addTodoReducer } from './slices/todoSlice';
import { authReducer } from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: addTodoReducer,
  },
});

export default store;
