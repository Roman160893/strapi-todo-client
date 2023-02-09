import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../button/Button';
import logo from '../../img/logo.png';
import { isAuthMe, logout } from '../../redux/slices/authSlice';
import './HeaderStyle.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  const onClickLogout = () => {
    if (window.confirm('Ви дійсно хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__content-logo">
            <Link to="/">
              <img src={logo} alt="header-logo" />
            </Link>
          </div>
          <div className="header__content-btn">
            {isAuth ? (
              <>
                <Button onClick={onClickLogout} red>
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button outline>Увійти</Button>
                </Link>
                <Link to="register">
                  <Button primary>Зареєструватись</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
