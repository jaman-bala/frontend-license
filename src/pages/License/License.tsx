import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./license.module.css";
import Cards from "../../components/interface/Cards/Cards.tsx";
import ModalForm from "../../components/interface/AddLicenseModalForm/AddLicenseModalForm.tsx";
import LicenseTable from "../../components/interface/LicenseTable/LicenseTable.tsx";
import ViewLicenseModal from "../../components/interface/ViewLicenseModal/ViewLicenseModal.tsx";

export interface DataType {
  id: React.Key;
  number_register: string;
  name_entity: string;
  tax_name: string;
  entity_address: string;
  address_program: string;
  issuing_license: string;
  data_license: string;
  form_number: string;
  data_address: string;
  form_number_data: string;
  title_school: string[];
  quantity_school: string[];
  file: string;
  issuing_authorities: { id: number, title: string };
  regions: { id: number, title: string };
  quantities: { id: number, title: string };
  code_status: { id: number, title: string };
}

const License: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [viewVisible, setViewVisible] = useState<boolean>(false);
  const [currentLicense, setCurrentLicense] = useState<DataType | null>(null);
  const [issuingAuthorities, setIssuingAuthorities] = useState<{ id: number, title: string }[]>([]);
  const [regions, setRegions] = useState<{ id: number, title: string }[]>([]);
  const [statuses, setStatuses] = useState<{ id: number, title: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          licensesResponse,
          authoritiesResponse,
          regionsResponse,
          statusesResponse
        ] = await Promise.all([
          axios.get("https://license.tsvs.kg/api/licenses"),
          axios.get("https://license.tsvs.kg/api/issuing"),
          axios.get("https://license.tsvs.kg/api/regions"),
          axios.get("https://license.tsvs.kg/api/status")
        ]);
        setData(licensesResponse.data);
        setIssuingAuthorities(authoritiesResponse.data);
        setRegions(regionsResponse.data);
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

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
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
      <div className={styles.top}>
        <h2 className={styles.title}>Таблица с данными о лицензиях</h2>
      </div>
      <Cards />
      <LicenseTable
        data={data}
        statuses={statuses}
        handleUpdateLicense={handleUpdateLicense}
        handleView={handleView}
        handleDelete={handleDelete}
        onAddLicense={handleAddLicense}
        showModal={() => setVisible(true)}
      />
      <ModalForm visible={visible} onOk={handleOk} onCancel={handleCancel} onAddLicense={handleAddLicense} />
      {currentLicense && (
        <ViewLicenseModal
          visible={viewVisible}
          onCancel={() => setViewVisible(false)}
          license={currentLicense}
          issuingAuthorities={issuingAuthorities}
          regions={regions}
          statuses={statuses}
        />
      )}
    </>
  );
};

export default License;
