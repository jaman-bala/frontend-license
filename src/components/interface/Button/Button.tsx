import React from 'react';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../../utils/redux/reducers/authSlice.ts';

import styles from './button.module.css';

const Button = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken()); 
 
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default Button;
