import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdateTodo } from '../../redux/slices/todoSlice';
import './todoListStyle.scss';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todoList } = useSelector((store) => store.todo);
  const authUser = useSelector((state) => state.auth.data);

  const filterTodo = () => {
    return todoList && todoList.filter((obj) => obj.attributes.user_id == authUser.id);
  };

  const handleCompletedTask = (id, e) => {
    const data = {
      id,
      data: {
        done: e.target.checked,
      },
    };

    dispatch(fetchUpdateTodo(data));
  };

  return (
    <div className="todo-list">
      <div className="todo-list__content">
        <ul>
          {filterTodo()?.map((el) => (
            <label className="todo-list__content-list" key={el.id}>
              <input
                type="checkbox"
                onClick={(e) => handleCompletedTask(el.id, e)}
                defaultChecked={el.attributes.done === true}
              />
              <li
                className={classNames('', {
                  'todo-list__content-list-complited': el.attributes.done === true,
                })}>
                {el.attributes.title}
              </li>
            </label>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
