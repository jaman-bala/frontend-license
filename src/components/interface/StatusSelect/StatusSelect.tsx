import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import axios from "axios";

interface Status {
  id: number;
  title: string;
}

const { Option } = Select;

interface StatusSelectProps {
  name: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ name, value, onChange, disabled }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatuses = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Status[]>("https://license.tsvs.kg/api/status");
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
        message.error("Ошибка при загрузке статусов.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  const handleSelectChange = (value: number) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select
      placeholder="Статус"
      loading={loading}
      style={{ width: "100%" }}
      value={value} 
      onChange={handleSelectChange}
      disabled={disabled}
    >
      {statuses.map((status) => (
        <Option key={status.id} value={status.id}>
          {status.title}
        </Option>
      ))}
    </Select>
  );
};

export default StatusSelect;
