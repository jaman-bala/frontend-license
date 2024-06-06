// Родитель для отрисовки всего контента 

import React from "react";
import { Layout } from "antd";
import styles from "./adminContent.module.css";

const { Content } = Layout;

const AdminContent = ({ children }) => {
  return <Content className={styles.content}>{children}</Content>;
};

export default AdminContent;
