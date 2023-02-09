import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from '../components/addTodo/AddTodo';
import TodoList from '../components/todoList/TodoList';
import { isAuthMe } from '../redux/slices/authSlice';
import { fetchAllTodo } from '../redux/slices/todoSlice';
import Main from './main/Main';

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  useEffect(() => {
    dispatch(fetchAllTodo());
  }, []);

  return (
    <div className="home">
      {isAuth ? (
        <>
          <AddTodo />
          <TodoList />
        </>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default Home;
