
// Компонета в форме добавления лицензии. Часть формы отвечает за заполнение вторых данных об лицензии (Вторая колонна)


import React from 'react';
import { Form, Input, Select } from 'antd';
import styles from '../addLicenseModalForm.module.css';

const { Option } = Select;

const LicenseSecondInfo = () => (
  <div className={styles.column__right}>
    <Form.Item
      className={styles.item}
      label="Основание и срок приостановления действия лицензии"
      name="form_number_suspended"
      rules={[
        {
          required: true,
          message:
            'Пожалуйста, введите основание и срок приостановления действия лицензии!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Основание и дата возобновления действия лицензии"
      name="form_number_start"
      rules={[
        {
          required: true,
          message:
            'Пожалуйста, введите основание и дату возобновления действия лицензии!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Основание и дата прекращения действия лицензии"
      name="form_number_stop"
      rules={[
        {
          required: true,
          message:
            'Пожалуйста, введите основание и дату прекращения действия лицензии!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Данные о смене адреса"
      name="data_address"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите данные о смене адреса!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Основание и дата выдачи дубликата"
      name="form_number_data"
      rules={[
        {
          required: true,
          message:
            'Пожалуйста, введите основание и дату выдачи дубликата!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Переоформления"
      name="re_registration"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите данные о переоформлении!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Срок действия"
      name="term"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите срок действия!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </div>
);

export default LicenseSecondInfo;
