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
  value?:number;
  onChange?: (value: number) => void; 
}

const QuantitySelect: React.FC<RegionSelectProps> = ({ name, value, onChange }) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Region[]>("http://127.0.0.1:8000/api/quantities");
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
      placeholder="Выберите форма обучения"
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

export default QuantitySelect;
