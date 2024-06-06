import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import axios from "axios";

interface Region {
  id: number;
  title: string;
}

const { Option } = Select;

interface RegionSelectProps {
  name: string;
  value?: number;
  onChange?: (value: number) => void; 
}

const RegionSelect: React.FC<RegionSelectProps> = ({ name, value, onChange }) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Region[]>("https://license.tsvs.kg/api/regions");
        setRegions(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
        message.error("Ошибка при загрузке регионов.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  const handleSelectChange = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      placeholder="Выберите регион"
      loading={loading}
      style={{ width: "100%" }}
      value={value}
      onChange={handleSelectChange}
    >
      {regions.map((region) => (
        <Option key={region.id} value={region.id}>
          {region.title}
        </Option>
      ))}
    </Select>
  );
};

export default RegionSelect;
