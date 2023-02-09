import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import { fetchRegister, isAuthMe } from '../../redux/slices/authSlice';
import './RegisterStyle.scss';

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value));
    if (data.payload) {
      window.localStorage.setItem('token', data.payload.jwt);
    } else {
      alert('Не вдалось зареєструватись!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="register__content">
          <h2>Зареєструватись</h2>
          <input
            type="text"
            placeholder="Ваше ім'я"
            {...register('username', { required: 'Вкажіть ваше імя' })}
          />
          <input
            type="email"
            placeholder="Введіть email"
            {...register('email', { required: 'Вкажіть ваш email' })}
          />
          <input
            type="password"
            placeholder="Введіть пароль"
            {...register('password', { required: 'Вкажіть ваш пароль' })}
          />
          <div className="register__content-btn">
            <Button primary type="submit">
              Зберегти
            </Button>
            <Button outline>Назад</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
