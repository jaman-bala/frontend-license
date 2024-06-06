// Таблица с выводом всех пользователей

import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "../../../pages/Users/users.module.css";

interface DataType {
  key: React.Key;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
}

interface UserTableProps {
  data: DataType[];
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ data, loading }) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive: boolean) => (isActive ? "Yes" : "No"),
    },
  ];

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 15 }}
    />
  );
};

export default UserTable;
