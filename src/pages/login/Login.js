import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import { fetchLogin, isAuthMe } from '../../redux/slices/authSlice';
import { fetchAllTodo } from '../../redux/slices/todoSlice';
import './LoginStyle.scss';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchLogin(value));
    if (data.payload) {
      window.localStorage.setItem('token', data.payload.jwt);
      dispatch(fetchAllTodo());
    } else {
      alert('Невірний логін або пароль!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login__content">
          <h2>Увійти</h2>
          <input
            type="email"
            placeholder="Введіть email"
            {...register('identifier', { required: 'Вкажіть email' })}
          />
          <input
            type="password"
            placeholder="Введіть пароль"
            {...register('password', { required: 'Вкажіть пароль' })}
          />
          <div className="login__content-btn">
            <Button type="submit" primary>
              Увійти
            </Button>
            <Button outline>Назад</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
