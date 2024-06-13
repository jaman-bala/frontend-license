import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import styles from "./viewLicenseModal.module.css";
import StatusSelect from "../StatusSelect/StatusSelect.tsx"; // Adjust import if necessary

const { Option } = Select;

interface DataType {
  id: React.Key;
  number_register: string;
  name_entity: string;
  tax_name: string;
  entity_address: string;
  address_program: string;
  cipher: string;
  title_school: string[];
  quantity_school: string[];
  issuing_license: string;
  data_license: string;
  form_number: string;
  form_number_suspended: string;
  form_number_start: string;
  form_number_stop: string;
  data_address: string;
  form_number_data: string;
  re_registration: string;
  term: string;
  file: string;
  issuing_authorities_id: number;
  regions_id: number;
  quantities_id: number;
  code_status_id: number;
  quantities: string[];
}

interface ViewLicenseModalProps {
  visible: boolean;
  onCancel: () => void;
  license: DataType;
  issuingAuthorities: { id: number; title: string }[];
  regions: { id: number; title: string }[];
  quantities: { id: number; title: string }[];
  statuses: { id: number; title: string }[];
}

const ViewLicenseModal: React.FC<ViewLicenseModalProps> = ({
  visible,
  onCancel,
  license,
  issuingAuthorities,
  regions,
  quantities,
  statuses,
}) => {
  const [form] = Form.useForm();
  const [schoolData, setSchoolData] = useState<
    { id: number; title: string; quantity: string; type: string }[]
  >([]);

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

      const schoolFields = {};
      initialSchoolData.forEach((school, index) => {
        schoolFields[`title_school_${index}`] = school.title;
        schoolFields[`quantity_school_${index}`] = school.quantity;
        schoolFields[`type_${index}`] = school.type;
      });

      form.setFieldsValue(schoolFields);
    }
  }, [license, form]);

  return (
    <Modal
      className={styles.content}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      title="Просмотр лицензии"
    >
      <Form form={form} className={styles.form} layout="vertical">
        <div className={styles.column__left}>
          <Form.Item
            label="Регистрационный № лицензии"
            name="number_register"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Наименование юридического лица"
            name="name_entity"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Идентификационный № налогоплательщика"
            name="tax_name"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Юридический адрес"
            name="entity_address"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Адрес реализации программы"
            name="address_program"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Шифр образовательной программы"
            name="cipher"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Основание выдачи лицензии"
            name="issuing_license"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Дата выдачи лицензии"
            name="data_license"
            className={styles.item}
          >
            <DatePicker format="YYYY-MM-DD" disabled />
          </Form.Item>
          <Form.Item
            label="Номер и серия бланка лицензии"
            name="form_number"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
        </div>

        <div className={styles.column__right}>
          <Form.Item
            label="Основание и срок приостановления действия лицензии"
            name="form_number_suspended"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Основание и дата возобновления действия лицензии"
            name="form_number_start"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Основание и дата прекращения действия лицензии"
            name="form_number_stop"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Данные о смене адреса"
            name="data_address"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Основание и дата выдачи дубликата"
            name="form_number_data"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Переоформления"
            name="re_registration"
            className={styles.item}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Срок действия" name="term" className={styles.item}>
            <Input disabled />
          </Form.Item>
        </div>

        <div className={styles.bottom__left}>
          {schoolData.map((field, index) => (
            <div key={field.id} className={styles.schoolDataRow}>
              <h3>{`Категория ${index + 1}`}</h3>
              <Form.Item
                label={`Наименование образовательной программы `}
                name={`title_school_${index}`}
                className={styles.item}
              >
                <Input value={field.title} disabled />
              </Form.Item>
              <Form.Item
                label={`Количество обучающихся `}
                name={`quantity_school_${index}`}
                className={styles.item}
              >
                <Input value={field.quantity} disabled />
              </Form.Item>
              <Form.Item
                label={`Тип ${index + 1}`}
                name={`type_${index}`}
                className={styles.item}
              >
                <Input value={field.type} disabled />
              </Form.Item>
            </div>
          ))}
        </div>

        <div className={styles.bottom__right}>
          <Form.Item label="Файл" name="file" className={styles.item}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Орган выдачи"
            name="issuing_authorities_id"
            className={styles.item}
          >
            <Select disabled>
              {issuingAuthorities.map((authority) => (
                <Option key={authority.id} value={authority.id}>
                  {authority.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Регион" name="regions_id" className={styles.item}>
            <Select disabled>
              {regions.map((region) => (
                <Option key={region.id} value={region.id}>
                  {region.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Статус"
            name="code_status_id"
            className={styles.item}
          >
            <StatusSelect value={license.code_status_id} disabled />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ViewLicenseModal;
