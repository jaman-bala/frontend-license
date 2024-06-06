import React, { useState } from "react";
import { Table, Button, Tooltip, message } from "antd";
import { EyeTwoTone, EditTwoTone } from "@ant-design/icons";
import EditLicenseModalForm from "../EditLicenseModalForm/EditLicenseModalForm.tsx";
import { DataType } from "../../../pages/License/License";
import styles from "./licenseTable.module.css";

interface LicenseTableProps {
  data: DataType[];
  handleUpdateLicense: (updatedLicense: DataType) => void;
  handleView: (license: DataType) => void;
}

const LicenseTable: React.FC<LicenseTableProps> = ({
  data,
  handleUpdateLicense,
  handleView,
  statuses,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<DataType | null>(null);

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

  const findTitleById = (id: number) => {
    const status = statuses.find((status) => status.id === id);
    return status ? status.title : id.toString(); 
  };

  const columns = [
    {
      title: "№",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Номер регистрации",
      dataIndex: "number_register",
      key: "number_register",
    },
    {
      title: "Наименование юр лиц",
      dataIndex: "name_entity",
      key: "name_entity",
    },
    {
      title: "Идентификационный номер",
      dataIndex: "tax_name",
      key: "tax_name",
    },
    {
      title: "Юридический адрес",
      dataIndex: "entity_address",
      key: "entity_address",
    },
    {
      title: "Адрес реализационной программы",
      dataIndex: "address_program",
      key: "address_program",
    },
    {
      title: "Статус",
      dataIndex: "code_status_id",
      key: "code_status_id",
      render: (statusId: number) => findTitleById(statusId),
    },
    {
      title: "Действия",
      dataIndex: "",
      key: "action",
      render: (_: any, record: DataType) => (
        <span>
          <Tooltip title="Просмотр">
            <Button onClick={() => handleView(record)}>
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

  return (
    <>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 20 }}
        rowKey="id"
      />
      {selectedLicense && (
        <EditLicenseModalForm
          visible={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          license={selectedLicense}
          onUpdateLicense={handleUpdateLicense}
        />
      )}
    </>
  );
};

export default LicenseTable;
