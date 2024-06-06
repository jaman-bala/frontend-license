import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
}

export const useUsers = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8009/user/");
        const users = response.data.map((user: any) => ({
          key: user.user_id,
          ...user,
        }));
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addUser = async (values: any) => {
    try {
      const { name, surname, email, password, is_active } = values;
      const requestData: any = { name, surname, email, password };
      if (is_active !== undefined) {
        requestData.is_active = is_active;
      }
      const response = await axios.post("http://127.0.0.1:8009/user/", requestData);
      const newData = { key: response.data.user_id, ...values };
      setData([...data, newData]);
      setVisible(false);
      message.success("User added successfully!");
    } catch (error) {
      console.error("Error adding new item:", error);
      if (error.response && error.response.status === 422) {
        message.error("Validation error: " + error.response.data.detail);
      } else {
        message.error("Error adding user.");
      }
    }
  };

  return {
    data,
    loading,
    visible,
    setVisible,
    addUser,
  };
};
