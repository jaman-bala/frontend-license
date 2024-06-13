import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../utils/redux/reducers/authSlice.ts";
import { RootState, AppDispatch } from "../../utils/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./signIn.module.css";
import img from "../../assets/img/v3.png";

const { Title, Text } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [serverError, setServerError] = useState<string | null>(null);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const resultAction = await dispatch(login(values));
      const { accessToken, refreshToken } = unwrapResult(resultAction);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("username", values.username);  // Save username for future use
      navigate("/");
    } catch (err: any) {
      console.error("Failed to login: ", err);
      setServerError(err.message || "Login failed");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <img src={img} className={styles.logo} alt="title" />
        <Title order={2} className={styles.title} level={2}>
          АИС Лицензий
        </Title>
        <Form
          name="signInForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Пожалуйста введите логин" }]}
          >
            <Input size="large" placeholder="Логин" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Пожалуйста введите пароль" }]}
          >
            <Input.Password size="large" placeholder="Пароль" />
          </Form.Item>

          {serverError && <p className={styles.error}>{serverError}</p>}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Text style={{ textAlign: "left", display: "block", color: "gray" }}>
          *Для получения логина и пароля обратитесь к IT отдел
        </Text>
      </div>
      <div className={styles.image} />
    </div>
  );
};

export default SignIn;
