
// Компонета в форме добавления лицензии. Часть формы отвечает за заполнение первых данных об лицензии (Первая колонна)

import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import styles from '../addLicenseModalForm.module.css';

const LicenseFirstInfo = ({ formRef }) => (
  <div className={styles.column__left}>
    <Form.Item
      className={styles.item}
      label="Регистрационный № лицензии"
      name="number_register"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите регистрационный номер!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Наименование юридического лица"
      name="name_entity"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите наименование юридического лица!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Идентификационный № налогоплательщика"
      name="tax_name"
      rules={[
        {
          required: true,
          message:
            'Пожалуйста, введите идентификационный номер налогоплательщика!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Юридический адрес"
      name="entity_address"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите юридический адрес!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Адрес реализации программы"
      name="address_program"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите адрес реализации программы!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Шифр образовательной программы"
      name="cipher"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите шифр образовательной программы!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Основание выдачи лицензии"
      name="issuing_license"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите основание выдачи лицензии!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Дата выдачи лицензии"
      name="data_license"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите дату выдачи лицензии!',
        },
      ]}
    >
      <DatePicker format="YYYY-MM-DD" />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Номер и серия бланка лицензии"
      name="form_number"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите номер и серию бланка лицензии!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </div>
);

export default LicenseFirstInfo;
