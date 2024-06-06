import React from "react";
import { Modal, Descriptions } from "antd";
import styles from './viewLicenseModal.module.css';
import moment from "moment"; // Убедитесь, что moment.js установлен

interface DataType {
  id: React.Key;
  number_register: string;
  name_entity: string;
  tax_name: string;
  entity_address: string;
  address_program: string;
  cipher: string;
  title_school: string;
  quantity_school: string;
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
}

interface ViewLicenseModalProps {
  visible: boolean;
  onCancel: () => void;
  license: DataType;
  issuingAuthorities: { id: number, title: string }[];
  regions: { id: number, title: string }[];
  quantities: { id: number, title: string }[];
  statuses: { id: number, title: string }[];
}

const ViewLicenseModal: React.FC<ViewLicenseModalProps> = ({ visible, onCancel, license, issuingAuthorities, regions, quantities, statuses }) => {
  const findTitleById = (id: number, data: { id: number, title: string }[]) => {
    const item = data.find(item => item.id === id);
    return item ? item.title : id;
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
  };

  return (
    <Modal className={styles.content} visible={visible} onCancel={onCancel} footer={null} title="Просмотр лицензии">
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Регистрационный № лицензии">{license.number_register}</Descriptions.Item>
        <Descriptions.Item label="Наименование юридического лица">{license.name_entity}</Descriptions.Item>
        <Descriptions.Item label="Идентификационный № налогоплательщика">{license.tax_name}</Descriptions.Item>
        <Descriptions.Item label="Юридический адрес">{license.entity_address}</Descriptions.Item>
        <Descriptions.Item label="Адрес реализации программы">{license.address_program}</Descriptions.Item>
        <Descriptions.Item label="Шифр образовательной программы">{license.cipher}</Descriptions.Item>
        <Descriptions.Item label="Наименование образовательной программы">{license.title_school}</Descriptions.Item>
        <Descriptions.Item label="Количество обучающихся">{license.quantity_school}</Descriptions.Item>
        <Descriptions.Item label="Основание выдачи лицензии">{license.issuing_license}</Descriptions.Item>
        <Descriptions.Item label="Дата выдачи лицензии">{formatDate(license.data_license)}</Descriptions.Item>
        <Descriptions.Item label="Номер и серия бланка лицензии">{license.form_number}</Descriptions.Item>
        <Descriptions.Item label="Основание и срок приостановления действия лицензии">{license.form_number_suspended}</Descriptions.Item>
        <Descriptions.Item label="Основание и дата возобновления действия лицензии">{license.form_number_start}</Descriptions.Item>
        <Descriptions.Item label="Основание и дата прекращения действия лицензии">{license.form_number_stop}</Descriptions.Item>
        <Descriptions.Item label="Данные о смене адреса">{license.data_address}</Descriptions.Item>
        <Descriptions.Item label="Основание и дата выдачи дубликата">{license.form_number_data}</Descriptions.Item>
        <Descriptions.Item label="Переоформления">{license.re_registration}</Descriptions.Item>
        <Descriptions.Item label="Срок действия">{license.term}</Descriptions.Item>
        <Descriptions.Item label="Файл">{license.file}</Descriptions.Item>
        <Descriptions.Item label="Орган выдачи">{findTitleById(license.issuing_authorities_id, issuingAuthorities)}</Descriptions.Item>
        <Descriptions.Item label="Регион">{findTitleById(license.regions_id, regions)}</Descriptions.Item>
        <Descriptions.Item label="Форма обучения">{findTitleById(license.quantities_id, quantities)}</Descriptions.Item>
        <Descriptions.Item label="Статус">{findTitleById(license.code_status_id, statuses)}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ViewLicenseModal;
