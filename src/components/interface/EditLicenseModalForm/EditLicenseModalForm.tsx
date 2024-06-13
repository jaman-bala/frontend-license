import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import styles from "./editLicenseModalForm.module.css";
import moment from "moment";
import LicenseFirstInfo from "../AddLicenseModalForm/LicenseFirstInfo/LicenseFirstInfo.tsx";
import LicenseSecondInfo from '../AddLicenseModalForm/LicenseSecondInfo/LicenseSecondInfo.tsx';
import LicenseStatus from "../AddLicenseModalForm/LicenseStatus/LicenseStatus.tsx";

const { Option } = Select;

interface SchoolDataItem {
  id: number;
  title: string;
  quantity: string;
  type: string;
}

const EditLicenseModalForm = ({ visible, onOk, onCancel, license }) => {
  const [form] = Form.useForm();
  const [schoolData, setSchoolData] = useState<SchoolDataItem[]>([
    { id: 0, title: "", quantity: "", type: "" },
  ]);

  useEffect(() => {
    if (license) {
      form.setFieldsValue({
        ...license,
        data_license: license.data_license
          ? moment(license.data_license)
          : null,
      });

      const initialSchoolData = license.title_school.map((title, index) => ({
        id: index,
        title: title,
        quantity: license.quantity_school[index],
        type: license.quantities[index],
      }));

      setSchoolData(initialSchoolData);
    }
  }, [license, form]);

  const prepareDataForUpdate = (formData, schoolData) => {
    const updatedData = {
      ...formData,
      data_license: formData.data_license
        ? formData.data_license.format("YYYY-MM-DD")
        : null,
      title_school: schoolData.map((field) => field.title),
      quantity_school: schoolData.map((field) => field.quantity),
      quantities: schoolData.map((field) => field.type),
    };

    return updatedData;
  };

  const onFinish = async (values) => {
    try {
      const updatedData = prepareDataForUpdate(values, schoolData);
      console.log("Отправляемые данные:", updatedData);
      const response = await axios.put(
        `https://license.tsvs.kg/api/licenses/${license.id}`,
        updatedData
      );

      if (response.status === 200) {
        message.success("Лицензия успешно обновлена!");
        onOk();
      }
    } catch (error) {
      console.error("Ошибка при обновлении лицензии:", error);
      message.error("Ошибка при обновлении лицензии.");
    }
  };

  const handleTitleChange = (index, value) => {
    const updatedFields = schoolData.map((field, i) =>
      i === index ? { ...field, title: value } : field
    );
    setSchoolData(updatedFields);
  };

  const handleQuantityChange = (index, value) => {
    const updatedFields = schoolData.map((field, i) =>
      i === index ? { ...field, quantity: value } : field
    );
    setSchoolData(updatedFields);
  };

  const handleTypeChange = (index, value) => {
    const updatedFields = schoolData.map((field, i) =>
      i === index ? { ...field, type: value } : field
    );
    setSchoolData(updatedFields);
  };

  const handleAddField = () => {
    const newField = { id: Date.now(), title: "", quantity: "", type: "" };
    setSchoolData([...schoolData, newField]);
  };

  const handleRemoveField = (idToRemove) => {
    const updatedFields = schoolData.filter((field) => field.id !== idToRemove);
    setSchoolData(updatedFields);
  };

  return (
    <Modal
      title="Редактировать лицензию"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className={styles.content}
    >
      <Form form={form} onFinish={onFinish} className={styles.form}>
       <LicenseFirstInfo formRef={form}/>

        <LicenseSecondInfo formRef={form}/>

        <div className={styles.bottom__left}>
          {schoolData.map((field, index) => (
            <div key={field.id} className={styles.bottom__left_card}>
              <h3>{`Категория ${index + 1}`}</h3>
              <Form.Item
                className={styles.item}
                label="Наименование образовательной программы"
                rules={[
                  {
                    required: true,
                    message:
                      "Пожалуйста, введите наименование образовательной программы!",
                  },
                ]}
              >
                <Input
                  value={field.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className={styles.item}
                label="Количество обучающихся"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите количество обучающихся!",
                  },
                ]}
              >
                <Input
                  value={field.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className={styles.item}
                label="Статус образовательной программы"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, выберите статус!",
                  },
                ]}
              >
                <Select
                  value={field.type}
                  onChange={(value) => handleTypeChange(index, value)}
                >
                  <Option value="Выдан">Выдан</Option>
                  <Option value="Анулированно">Анулированно</Option>
                </Select>
              </Form.Item>
              <div className={styles.btnContainer}>
                {schoolData.length > 1 && (
                  <Button
                    type="primary"
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleRemoveField(field.id)}
                    className={styles.delete}
                  >
                    Удалить
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className={styles.addCategoryBtn}>
          <Button  type="primary" onClick={handleAddField}>
            Добавить категорию
          </Button>
          </div>
        </div>

      <LicenseStatus/>

        <Form.Item className={styles.btnCont}>
          <Button className={styles.sendBtn} type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLicenseModalForm;
