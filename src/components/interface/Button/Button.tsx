import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../../utils/redux/reducers/authSlice.ts';
import { Button  } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styles from './button.module.css';

const ButtonExit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <Button
      className={styles.logoutButton}
      type="default"
      onClick={handleLogout}
      icon={<LogoutOutlined />}
    >
      Выйти
    </Button>
  );
};

export default ButtonExit;
