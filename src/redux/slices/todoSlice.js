import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  todoItem: {},
  todoList: [],
  status: 'loading',
};

export const fetchAddTodo = createAsyncThunk('todo/fetchAddTodo', async (obj) => {
  const { data } = await axios.post('/todos', obj, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
  return data;
});

export const fetchAllTodo = createAsyncThunk('todo/fetchAllTodo', async () => {
  const { data } = await axios.get('/todos', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });
  return data;
});

export const fetchUpdateTodo = createAsyncThunk('todo/fetchUpdateTodo', async (params) => {
  const { data } = await axios.put(`/todos/${params.id}`, params, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

  return data;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  extraReducers: {
    [fetchAddTodo.pending]: (state) => {
      state.status = 'loading';
      state.todoItem = null;
    },
    [fetchAddTodo.fulfilled]: (state, action) => {
      state.todoItem = action.payload.data.attributes;
      state.status = 'loaded';
    },
    [fetchAddTodo.rejected]: (state) => {
      state.todoItem = null;
      state.status = 'error';
    },

    [fetchAllTodo.pending]: (state) => {
      state.status = 'loading';
      state.todoList = null;
    },
    [fetchAllTodo.fulfilled]: (state, action) => {
      state.todoList = action.payload.data;
      state.status = 'loaded';
    },
    [fetchAllTodo.rejected]: (state) => {
      state.todoList = null;
      state.status = 'error';
    },

    [fetchAllTodo.pending]: (state) => {
      state.status = 'loading';
      state.todoList = null;
    },
    [fetchAllTodo.fulfilled]: (state, action) => {
      state.todoList = action.payload.data;
      state.status = 'loaded';
    },
    [fetchAllTodo.rejected]: (state) => {
      state.todoList = null;
      state.status = 'error';
    },

    [fetchUpdateTodo.pending]: (state) => {
      state.status = 'loading';
      state.todoItem = null;
    },
    [fetchUpdateTodo.fulfilled]: (state, action) => {
      const task = state.todoList.find((el) => el.id === action.payload.data.id);

      if (task) {
        task.attributes.done = !task.attributes.done;
      }

      state.todoItem = action.payload.data;
      state.status = 'loaded';
    },
    [fetchUpdateTodo.rejected]: (state) => {
      state.todoItem = null;
      state.status = 'error';
    },
  },
});

export const addTodoReducer = todoSlice.reducer;
