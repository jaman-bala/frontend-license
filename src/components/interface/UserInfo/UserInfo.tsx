import React from 'react'
import styles from './userInfo.module.css'
import {  UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";


const UserInfo = () => {
  return (
    <div className={styles.info}>
    <Space>
      <Avatar size={40} icon={<UserOutlined />} />
    </Space>
    <div className={styles.fio}>
      <p>Алишер</p>
      <p>Рыспаев</p>
    </div>
  </div>
  )
}

export default UserInfo