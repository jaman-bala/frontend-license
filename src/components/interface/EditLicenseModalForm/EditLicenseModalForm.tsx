import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import axios from "axios";
import { DataType } from "../../../pages/License/License";
import styles from "./editLicenseModalForm.module.css";
import moment from "moment";
import RegionSelect from "../RegionSelect/RegionSelect.tsx";
import IssuingSelect from "../IssuingSelect//IssuingSelect.tsx";
import QuantitySelect from "../QuantitySelect/QuantitySelect.tsx";
import StatusSelect from "../StatusSelect/StatusSelect.tsx";

interface ModalFormProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  license: DataType | null;
  onUpdateLicense: (updatedLicense: DataType) => void;
}

const EditLicenseModalForm: React.FC<ModalFormProps> = ({
  visible,
  onOk,
  onCancel,
  license,
  onUpdateLicense,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (license) {
      form.setFieldsValue({
        ...license,
        data_license: license.data_license ? moment(license.data_license) : null,
      });
    }
  }, [license, form]);

  const onFinish = async (formData: DataType) => {
    try {
      const response = await axios.put(
        `https://license.tsvs.kg/api/licenses/${license?.id}`,
        formData
      );
      if (response.status === 200) {
        message.success("Лицензия успешно обновлена!");
        onUpdateLicense({ id: license!.id, ...formData });
        onOk();
      }
    } catch (error) {
      console.error("Error updating license:", error);
      message.error("Ошибка при обновлении лицензии.");
    }
  };

  return (
    <Modal
      title="Редактировать лицензию"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      className={styles.content}
    >
      <Form form={form} onFinish={onFinish} >
        <Form.Item
          label="Регистрационный № лицензии"
          name="number_register"
          rules={[{ required: true, message: "Пожалуйста, введите регистрационный номер!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Наименование юридического лица"
          name="name_entity"
          rules={[{ required: true, message: "Пожалуйста, введите наименование юридического лица!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Идентификационный № налогоплательщика"
          name="tax_name"
          rules={[{ required: true, message: "Пожалуйста, введите идентификационный номер налогоплательщика!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Юридический адрес"
          name="entity_address"
          rules={[{ required: true, message: "Пожалуйста, введите юридический адрес!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Адрес реализации программы"
          name="address_program"
          rules={[{ required: true, message: "Пожалуйста, введите адрес реализации программы!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Шифр образовательной программы"
          name="cipher"
          rules={[{ required: true, message: "Пожалуйста, введите шифр образовательной программы!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Наименование образовательной программы"
          name="title_school"
          rules={[{ required: true, message: "Пожалуйста, введите наименование образовательной программы!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Количество обучающихся"
          name="quantity_school"
          rules={[{ required: true, message: "Пожалуйста, введите количество обучающихся!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Основание выдачи лицензии"
          name="issuing_license"
          rules={[{ required: true, message: "Пожалуйста, введите основание выдачи лицензии!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Дата выдачи лицензии"
          name="data_license"
          rules={[{ required: true, message: "Пожалуйста, введите дату выдачи лицензии!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Номер и серия бланка лицензии"
          name="form_number"
          rules={[{ required: true, message: "Пожалуйста, введите номер и серию бланка лицензии!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Основание и срок приостановления действия лицензии"
          name="form_number_suspended"
          rules={[{ required: true, message: "Пожалуйста, введите основание и срок приостановления действия лицензии!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Основание и дата возобновления действия лицензии"
          name="form_number_start"
          rules={[{ required: true, message: "Пожалуйста, введите основание и дату возобновления действия лицензии!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Основание и дата прекращения действия лицензии"
          name="form_number_stop"
          rules={[{ required: true, message: "Пожалуйста, введите основание и дату прекращения действия лицензии!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Данные о смене адреса"
          name="data_address"
          rules={[{ required: true, message: "Пожалуйста, введите данные о смене адреса!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Основание и дата выдачи дубликата"
          name="form_number_data"
          rules={[{ required: true, message: "Пожалуйста, введите основание и дату выдачи дубликата!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Переоформления"
          name="re_registration"
          rules={[{ required: true, message: "Пожалуйста, введите данные о переоформлении!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Срок действия"
          name="term"
          rules={[{ required: true, message: "Пожалуйста, введите данные о переоформлении!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Файл"
          name="file"
          rules={[{ required: true, message: "Пожалуйста, введите файл!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Орган выдачи"
          name="issuing_authorities_id"
          rules={[{ required: true, message: "Пожалуйста, введите орган выдачи!" }]}
        >
           <IssuingSelect name="issuing_authorities_id" value={license?.issuing_authorities_id} />
        </Form.Item>
        <Form.Item
          label="Регион"
          name="regions_id"
          rules={[{ required: true, message: "Пожалуйста, введите регион!" }]}
        >
          <RegionSelect name="regions_id" value={license?.regions_id} />
        </Form.Item>
        <Form.Item
          label="Форма обучения"
          name="quantities_id"
          rules={[{ required: true, message: "Пожалуйста, введите форму обучения!" }]}
        >
          <QuantitySelect name="quantities_id" value={license?.quantities_id} />
        </Form.Item>
        <Form.Item
          label="Статус"
          name="code_status_id"
          rules={[{ required: true, message: "Пожалуйста, введите статус!" }]}
        >
          <StatusSelect name="code_status_id" value={license?.code_status_id} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLicenseModalForm;
