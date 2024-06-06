import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, эта страница не существует."
      extra={<Button type="primary" onClick={handleBackHome}>Вернуться на главную</Button>}
    />
  );
};

export default NotFound;
