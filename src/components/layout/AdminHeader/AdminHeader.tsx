// Админ Шапка

import React from "react";
import { Layout } from "antd";
import styles from "./adminHeader.module.css";
import logo from "../../../assets/img/logo-license.png";
import UserInfo from '../../interface/UserInfo/UserInfo.tsx'
import ButtonExit from "../../interface/Button/Button.tsx";

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.header__left}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <h2 className={styles.header__title}>GARTSVS LICENSE DATABASE</h2>
      </div>
      <div className={styles.header__right}>
        <UserInfo/>
        <ButtonExit/>
      </div>
    </Header>
  );
};

export default AdminHeader;
