import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import styles from "./license.module.css";
import Cards from "../../components/interface/Cards/Cards.tsx";
import ModalForm from "../../components/interface/AddLicenseModalForm/AddLicenseModalForm.tsx";
import LicenseTable from "../../components/interface/LicenseTable/LicenseTable.tsx";
import ViewLicenseModal from "../../components/interface/ViewLicenseModal/ViewLicenseModal.tsx";
import { PlusCircleTwoTone } from '@ant-design/icons';

export interface DataType {
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
  file: string;
  issuing_authorities_id: number;
  regions_id: number;
  quantities_id: number;
  code_status_id: number;
}

const License: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [viewVisible, setViewVisible] = useState<boolean>(false);
  const [currentLicense, setCurrentLicense] = useState<DataType | null>(null);
  const [issuingAuthorities, setIssuingAuthorities] = useState<{ id: number, title: string }[]>([]);
  const [regions, setRegions] = useState<{ id: number, title: string }[]>([]);
  const [quantities, setQuantities] = useState<{ id: number, title: string }[]>([]);
  const [statuses, setStatuses] = useState<{ id: number, title: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [licensesResponse, authoritiesResponse, regionsResponse, quantitiesResponse, statusesResponse] = await Promise.all([
          axios.get("https://license.tsvs.kg/api/licenses"),
          axios.get("https://license.tsvs.kg/api/issuing"),
          axios.get("https://license.tsvs.kg/api/regions"),
          axios.get("https://license.tsvs.kg/api/quantities"),
          axios.get("https://license.tsvs.kg/api/status")
        ]);
        setData(licensesResponse.data);
        setIssuingAuthorities(authoritiesResponse.data);
        setRegions(regionsResponse.data);
        setQuantities(quantitiesResponse.data);
        setStatuses(statusesResponse.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  const handleAddLicense = (newLicense: DataType) => {
    setData([...data, newLicense]);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("https://license.tsvs.kg/api/licenses", values);
      setData([...data, { id: response.data.id, ...values }]);
      setVisible(false);
    } catch (error) {
      console.error("There was an error adding the data!", error);
    }
  };

  const handleUpdateLicense = (updatedLicense: DataType) => {
    setData((prevData) =>
      prevData.map((license) =>
        license.id === updatedLicense.id ? updatedLicense : license
      )
    );
  };

  const handleDelete = async (key: React.Key) => {
    try {
      await axios.delete(`https://license.tsvs.kg/api/licenses/${key}`);
      setData(data.filter((item) => item.id !== key));
    } catch (error) {
      console.error("There was an error deleting the data!", error);
    }
  };

  const handleView = (license: DataType) => {
    setCurrentLicense(license);
    setViewVisible(true);
  };

  return (
    <>
      <div className={styles.top}><h2 className={styles.title}>Таблица с данными о лицензиях</h2>
      <Button
          className={styles.primary__btn}
         
          onClick={showModal}
          style={{ marginBottom: 16 }}
        >
          <PlusCircleTwoTone />
          Добавить
        </Button></div>
      <Cards />
      <div className={styles.btn}>
       
      </div>
      <ModalForm visible={visible} onOk={handleOk} onCancel={handleCancel} onFinish={onFinish} onAddLicense={handleAddLicense} />
      <LicenseTable data={data} statuses={statuses} handleUpdateLicense={handleUpdateLicense} handleView={handleView} handleDelete={handleDelete} />
      {currentLicense && (
        <ViewLicenseModal
          visible={viewVisible}
          onCancel={() => setViewVisible(false)}
          license={currentLicense}ф
          issuingAuthorities={issuingAuthorities}
          regions={regions}
          quantities={quantities}
          statuses={statuses}
        />
      )}
    </>
  );
};

export default License;
