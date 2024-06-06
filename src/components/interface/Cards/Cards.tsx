import React, { useState, useEffect } from "react";
import styles from "./cards.module.css";
import { Card, Col, Row, Statistic } from "antd";
import axios from "axios";

export default function Cards() {
  const [licenseStats, setLicenseStats] = useState({
    issued: 0,
    suspended: 0,
    revoked: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://license.tsvs.kg/api/licenses");
        const licenses = response.data;

        const issued = licenses.filter(
          (license) => license.code_status_id === 1
        ).length;
        const suspended = licenses.filter(
          (license) => license.code_status_id === 2
        ).length;
        const revoked = licenses.filter(
          (license) => license.code_status_id === 3
        ).length;

        setLicenseStats({ issued, suspended, revoked });
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    const intervalId = setInterval(fetchData, 5000);
    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Row className={styles.row} gutter={30}>
        <Col span={8}>
          <Card
            style={{
              background:
                "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className={styles.card}
            bordered={false}
          >
            <Statistic
              title="Выдано лицензий"
              value={licenseStats.issued}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              background: "#f9b115",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className={styles.card}
            bordered={false}
          >
            <Statistic
              title="Приостановлено"
              value={licenseStats.suspended}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              background: "#e55353",
              borderRadius: "8px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className={styles.card}
            bordered={false}
          >
            <Statistic
              title="Анулировано"
              value={licenseStats.revoked}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
