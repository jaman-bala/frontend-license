// Админ Sidebar

import React from "react";
import { Layout } from "antd";
import AdminMenu from "../../interface/AdminMenu/AdminMenu.tsx";
import logo from "../../../assets/img/logo-license.png";
import styles from "./adminSideBar.module.css";

const { Sider } = Layout;

const AdminSideBar = () => {
  return (
    <Sider width="17%" className={styles.sidebar}>
      <div className={styles.menuWrapper}>
        <AdminMenu />
      </div>
     
    </Sider>
  );
};

export default AdminSideBar;
