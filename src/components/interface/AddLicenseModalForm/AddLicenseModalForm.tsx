import React, { useState, useRef } from "react";
import { Modal, Form,  Button, message, Select } from "antd";
import styles from "./addLicenseModalForm.module.css";
import axios from "axios";
import { DataType } from "../../../pages/License/License.tsx";
import LicenseFirstInfo from "./LicenseFirstInfo/LicenseFirstInfo.tsx";
import LicenseSecondInfo from "./LicenseSecondInfo/LicenseSecondInfo.tsx";
import SchoolCategoryInfo from "./SchoolCategoryInfo/SchoolCategoryInfo.tsx";
import LicenseStatus from "./LicenseStatus/LicenseStatus.tsx";

const { Option } = Select;

interface ModalFormProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  onAddLicense: (newLicense: DataType) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  visible,
  onOk,
  onCancel,
  onAddLicense,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [schoolData, setSchoolData] = useState([
    { id: 1, title: "", quantity: "", type: "" },
  ]);

  const onFinish = async (formData: any) => {
    console.log("Форма отправлена:", formData);
    try {
      const response = await axios.post("https://license.tsvs.kg/api/licenses", {
        title_school: schoolData.map((field) => field.title),
        quantity_school: schoolData.map((field) => field.quantity),
        quantities: schoolData.map((field) => field.type),
        ...formData,
      });
      console.log(response.data);
      if (response.status === 200) {
        setFormSubmitted(true);
        onAddLicense({ id: response.data.id, ...formData });
        message.success("Лицензия успешно обновлена!");
        onOk();
        formRef.current?.resetFields();
      }
    } catch (error) {
      console.error("Error adding license:", error);
      message.error("Ошибка при  лицензии.");
      throw new Error("Error adding license");
    }
  };

  const handleTitleChange = (id, value) => {
    const updatedFields = schoolData.map((field) =>
      field.id === id ? { ...field, title: value } : field
    );
    setSchoolData(updatedFields);
  };

  const handleQuantityChange = (id, value) => {
    const updatedFields = schoolData.map((field) =>
      field.id === id ? { ...field, quantity: value } : field
    );
    setSchoolData(updatedFields);
  };

  const handleSelectChange = (id, value) => {
    const updatedFields = schoolData.map((field) =>
      field.id === id ? { ...field, type: value } : field
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

  const formRef = useRef<FormInstance>(null);

  const handleOk = () => {
    setFormSubmitted(false);
    onOk();
  };
  return (
    <Modal
      title="Добавить новую лицензию"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={null}
      className={styles.content}
    >
      <Form ref={formRef} onFinish={onFinish} className={styles.form}>
        <LicenseFirstInfo formRef={formRef} />

        <LicenseSecondInfo formRef={formRef} />

        <div className={styles.bottom__inner}>
          {schoolData.map((field, index) => (
            <SchoolCategoryInfo
              key={field.id}
              field={field}
              index={index}
              handleTitleChange={handleTitleChange}
              handleQuantityChange={handleQuantityChange}
              handleSelectChange={handleSelectChange}
              handleRemoveField={handleRemoveField}
            />
          ))}
          <div className={styles.addCategoryBtn}>
            <Button type="primary" onClick={handleAddField}>
              Добавить категорию
            </Button>
          </div>
        </div>

        <LicenseStatus formRef={formRef} />


        <Form.Item className={styles.btnCont}>
          <Button className={styles.sendBtn} type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
