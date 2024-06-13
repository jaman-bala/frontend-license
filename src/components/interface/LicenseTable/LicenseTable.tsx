import React, { useState } from 'react';
import { Table, Button, Tooltip, Tag, Input } from 'antd';
import { EyeTwoTone, EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import EditLicenseModalForm from '../EditLicenseModalForm/EditLicenseModalForm.tsx';
import { DataType } from '../../../pages/License/License';
import styles from './licenseTable.module.css';

interface LicenseTableProps {
  data: DataType[];
  handleUpdateLicense: (updatedLicense: DataType) => void;
  handleView: (license: DataType) => void;
  handleDelete: (key: React.Key) => void;
  statuses: { id: number; title: string }[];
  showModal: () => void;
  onAddLicense: (newLicense: DataType) => void;
}

const LicenseTable: React.FC<LicenseTableProps> = (props) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<DataType | null>(null);
  const [searchText, setSearchText] = useState('');

  const showEditModal = (license: DataType) => {
    setSelectedLicense(license);
    setEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    setEditModalVisible(false);
    setSelectedLicense(null);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedLicense(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const findStatusColor = (statusId: number) => {
    switch (statusId) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '№',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Номер регистрации',
      dataIndex: 'number_register',
      key: 'number_register',
    },
    {
      title: 'Наименование юр лиц',
      dataIndex: 'name_entity',
      key: 'name_entity',
    },
    {
      title: 'Идентификационный номер',
      dataIndex: 'tax_name',
      key: 'tax_name',
    },
    {
      title: 'Юридический адрес',
      dataIndex: 'entity_address',
      key: 'entity_address',
    },
    {
      title: 'Адрес реализационной программы',
      dataIndex: 'address_program',
      key: 'address_program',
    },
    {
      title: 'Статус',
      dataIndex: 'code_status_id',
      key: 'code_status_id',
      render: (statusId: number) => {
        const statusTitle =
          statusId === 1 ? 'Выдан' : statusId === 2 ? 'Приостановлено' : statusId === 3 ? 'Анулировано' : 'Другой статус';
        const color = findStatusColor(statusId);
        return <Tag color={color}>{statusTitle}</Tag>;
      },
      filters: [
        { text: 'Выдан', value: 1 },
        { text: 'Приостановлено', value: 2 },
        { text: 'Анулировано', value: 3 },
      ],
      onFilter: (value: number, record: DataType) => record.code_status_id === value,
    },
    {
      title: 'Действия',
      dataIndex: '',
      key: 'action',
      render: (_: any, record: DataType) => (
        <span>
          <Tooltip title="Просмотр">
            <Button onClick={() => props.handleView(record)}>
              <EyeTwoTone />
            </Button>
          </Tooltip>
          <Tooltip title="Изменить">
            <Button onClick={() => showEditModal(record)}>
              <EditTwoTone />
            </Button>
          </Tooltip>
        </span>
      ),
    },
  ];

  const filteredData = props.data.filter(item =>
    columns.some(column => {
      const dataIndex = column.dataIndex;
      return dataIndex && item[dataIndex]?.toString().toLowerCase().includes(searchText);
    })
  );

  return (
    <>
      <div className={styles.top}>
        <Input.Search
          placeholder="Введите текст для поиска"
          allowClear
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
          className={styles.search}
        />
        <Button
          className={styles.primary__btn}
          onClick={props.showModal}
          style={{ marginBottom: 16 }}
        >
          <PlusCircleTwoTone />
          Добавить
        </Button>
      </div>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 20 }}
        rowKey="id"
      />
      {selectedLicense && (
        <EditLicenseModalForm
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          license={selectedLicense}
          onUpdateLicense={props.handleUpdateLicense}
        />
      )}
    </>
  );
};

export default LicenseTable;
