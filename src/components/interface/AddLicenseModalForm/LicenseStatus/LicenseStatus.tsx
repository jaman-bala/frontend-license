
// Компонета в форме добавления лицензии. Часть формы отвечает за заполнение данных об статусе лицензии автошколы и отвечающим за выдачу органам 

import React from 'react';
import { Form, Input, Select } from 'antd';
import styles from '../addLicenseModalForm.module.css';
import IssuingSelect from '../../IssuingSelect/IssuingSelect.tsx';
import RegionSelect from '../../RegionSelect/RegionSelect.tsx';
import StatusSelect from '../../StatusSelect/StatusSelect.tsx';

const { Option } = Select;

const LicenseStatus = () => (
    <div className={styles.bottom__right}>
    <Form.Item
      className={styles.item}
      label="Файл"
      name="file"
      rules={[{ required: true, message: "Пожалуйста, введите файл!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Орган выдачи"
      name="issuing_authorities_id"
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите орган выдачи!",
        },
      ]}
    >
      <IssuingSelect name="issuing_authorities_id" />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Регион"
      name="regions_id"
      rules={[{ required: true, message: "Пожалуйста, введите регион!" }]}
    >
      <RegionSelect name="regions_id" />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Статус"
      name="code_status_id"
      rules={[{ required: true, message: "Пожалуйста, введите статус!" }]}
    >
      <StatusSelect name="code_status_id" />
    </Form.Item>
  </div>
);

export default LicenseStatus;
