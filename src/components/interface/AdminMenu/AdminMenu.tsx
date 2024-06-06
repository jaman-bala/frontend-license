import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { DatabaseOutlined } from "@ant-design/icons";
import styles from "./adminMenu.module.css";
import Button from "../Button/Button.tsx";
import UserInfo from "../UserInfo/UserInfo.tsx";

interface MenuItem {
  label: string;
  key: string;
  to: string;
  icon: React.ReactNode;
}

const AdminMenu: React.FC = () => {
  const items: MenuItem[] = [
    {
      label: "База данных лицензий",
      key: "license",
      to: "/",
      icon: <DatabaseOutlined />,
    },
    // { label: "Пользователи", key: "users", to: "/users", icon: <UserOutlined /> },
  ];

  return (
    <div className={styles.menu}>
      <Menu mode="vertical">
        {items.map((item) => (
          <Menu.Item className={styles.menu__item} key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default AdminMenu;
