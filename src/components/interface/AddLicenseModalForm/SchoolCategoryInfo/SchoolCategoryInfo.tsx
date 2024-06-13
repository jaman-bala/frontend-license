
// Компонета в форме добавления лицензии. Данная часть отвечает за заполнение данных об определенной категории выданной лицензии и её статус

import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import styles from '../addLicenseModalForm.module.css';

const { Option } = Select;

const SchoolCategoryInfo = ({ field, index, handleTitleChange, handleQuantityChange, handleSelectChange, handleRemoveField }) => (
  <div key={field.id} className={styles.bottom__left}>
    <h3>{`Категория ${index + 1}`}</h3>
    <Form.Item
      className={styles.item}
      label="Наименование образовательной программы"
      name={`title_school_${index}`}
      rules={[
        {
          required: true,
          message:
            'Пожалуйста, введите наименование образовательной программы!',
        },
      ]}
    >
      <Input
        value={field.title}
        onChange={(e) => handleTitleChange(field.id, e.target.value)}
      />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Количество обучающихся"
      name={`quantity_school_${index}`}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите количество обучающихся!',
        },
      ]}
    >
      <Input
        value={field.quantity}
        onChange={(e) => handleQuantityChange(field.id, e.target.value)}
      />
    </Form.Item>
    <Form.Item
      className={styles.item}
      label="Статус образовательной программы"
      name={`quantities_${index}`}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, выберите статус!',
        },
      ]}
    >
      <Select
        value={field.type}
        onChange={(value) => handleSelectChange(field.id, value)}
      >
        <Option value="Выдан">Выдан</Option>
        <Option value="Анулированно">Анулированно</Option>
      </Select>
    </Form.Item>
    <div className={styles.btnContainer}>
      <Button
        type="primary"
        danger
        onClick={() => handleRemoveField(field.id)}
        className={styles.delete}
      >
        Удалить категорию
      </Button>
    </div>
  </div>
);

export default SchoolCategoryInfo;
