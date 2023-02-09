import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './AppStyle.scss';
import Header from './components/header/Header';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { fetchAuthMe, isAuthMe } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthMe);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
