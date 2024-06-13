import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './userInfo.module.css';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Token:', refreshToken);
      try {
        const response = await axios.get('https://license.tsvs.kg/api/api/current-user', {
          headers: {
           'Authorization': `Bearer ${refreshToken}`
          }
        });
        const user = response.data;
        setUserData(user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
     
          console.error('User is not authorized:', error.response.data);
        } else {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
  
    if (refreshToken) {
      fetchUserData();
    }
  }, [refreshToken]);  // Добавляем refreshToken в зависимости, чтобы запрос запускался при его изменении или загрузке компонента
  
  return (
    <div className={styles.info}>
      <Space>
        <Avatar size={40} icon={<UserOutlined />} />
      </Space>
      <div className={styles.fio}>
        {userData ? (
          <>
            <p>{userData.first_name}</p>
            <p>{userData.last_name}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
