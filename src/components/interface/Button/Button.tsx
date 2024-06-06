import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../../utils/redux/reducers/authSlice.ts';
import { Button  } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styles from './button.module.css';

const ButtonExit = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken()); 
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
