import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../utils/redux/reducers/authSlice.ts";
import { RootState, AppDispatch } from "../../utils/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";

import styles from "./signIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [serverError, setServerError] = useState<string | null>(null);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const resultAction = await dispatch(login(values));
      const token = unwrapResult(resultAction);
      localStorage.setItem("accessToken", token);
      navigate("/");
    } catch (err: any) {
      console.error("Failed to login: ", err);
      setServerError(err.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form__wrapper}>
        <h2 className={styles.title}>License Database</h2>
        <Form
          name="signInForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            className={styles.form__item}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className={styles.form__item}
          >
            <Input.Password />
          </Form.Item>

          {serverError && <p className={styles.error}>{serverError}</p>}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btn__submit}
              loading={loading}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
