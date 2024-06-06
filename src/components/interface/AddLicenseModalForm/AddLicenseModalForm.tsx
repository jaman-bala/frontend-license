import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  DatePicker,
  ConfigProvider,
  Layout,
} from "antd";
import styles from "./addLicenseModalForm.module.css";
import axios from "axios";
import { DataType } from "../../../pages/License/License.tsx";
import RegionSelect from "../RegionSelect/RegionSelect.tsx";
import IssuingSelect from "../IssuingSelect/IssuingSelect.tsx";
import QuantitySelect from "../QuantitySelect/QuantitySelect.tsx";
import StatusSelect from "../StatusSelect/StatusSelect.tsx";

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

  const onFinish = async (formData: any) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/licenses",
        formData
      );
      console.log(response.data);
      if (response.status === 200) {
        setFormSubmitted(true);
        onAddLicense({ id: response.data.id, ...formData });
        message.success("Лицензия успешно добавлена!");
        onOk();
      }
    } catch (error) {
      console.error("Error adding license:", error);
      message.error("Ошибка при добавлении лицензии.");
      throw new Error("Error adding license");
    }
  };

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
      <Form onFinish={onFinish} className={styles.form}>
        <div className={styles.column__left}>
          <Form.Item
            className={styles.item}
            label="Регистрационный № лицензии"
            name="number_register"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите регистрационный номер!",
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
                message: "Пожалуйста, введите наименование юридического лица!",
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
                  "Пожалуйста, введите идентификационный номер налогоплательщика!",
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
                message: "Пожалуйста, введите юридический адрес!",
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
                message: "Пожалуйста, введите адрес реализации программы!",
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
                message: "Пожалуйста, введите шифр образовательной программы!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={styles.item}
            label="Наименование образовательной программы"
            name="title_school"
            rules={[
              {
                required: true,
                message:
                  "Пожалуйста, введите наименование образовательной программы!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={styles.item}
            label="Количество обучающихся"
            name="quantity_school"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите количество обучающихся!",
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
                message: "Пожалуйста, введите основание выдачи лицензии!",
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
                message: "Пожалуйста, введите дату выдачи лицензии!",
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
                message: "Пожалуйста, введите номер и серию бланка лицензии!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className={styles.column__right}>
          <Form.Item
            className={styles.item}
            label="Основание и срок приостановления действия лицензии"
            name="form_number_suspended"
            rules={[
              {
                required: true,
                message:
                  "Пожалуйста, введите основание и срок приостановления действия лицензии!",
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
                  "Пожалуйста, введите основание и дату возобновления действия лицензии!",
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
                  "Пожалуйста, введите основание и дату прекращения действия лицензии!",
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
                message: "Пожалуйста, введите данные о смене адреса!",
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
                  "Пожалуйста, введите основание и дату выдачи дубликата!",
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
                message: "Пожалуйста, введите данные о переоформлении!",
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
                message: "Пожалуйста, введите данные о переоформлении!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className={styles.bottom}>
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
            label="Форма обучения"
            name="quantities_id"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите форму обучения!",
              },
            ]}
          >
            <QuantitySelect name="quantities_id" />
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
