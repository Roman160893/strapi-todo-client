import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAddTodo, fetchAllTodo } from '../../redux/slices/todoSlice';
import Button from '../button/Button';
import './addTodoStyle.scss';

const AddTodo = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.data);

  const [todoItem, setTodoItem] = useState('');

  const handleTodoItem = (e) => {
    setTodoItem(e.target.value);
  };

  const clickAddTodo = () => {
    const data = {
      data: {
        title: todoItem,
        done: false,
        user_id: String(authUser.id),
      },
    };

    dispatch(fetchAddTodo(data));
    dispatch(fetchAllTodo());

    setTodoItem('');
  };

  return (
    <div className="addtodo">
      <h1 className="addtodo__title"> Список завдань </h1>
      <div className="addtodo__content">
        <input type="text" value={todoItem} onChange={(e) => handleTodoItem(e)} />
        <Button onClick={clickAddTodo} primary>
          Додати
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
