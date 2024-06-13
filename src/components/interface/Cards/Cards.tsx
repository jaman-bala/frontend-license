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
        const response = await axios.get("http://127.0.0.1:8000/api/licenses");
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
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className={styles.card}
            bordered={false}
          >
            <Statistic
            className={styles.card__title}
              title="Выдано лицензий"
              value={licenseStats.issued}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              background: "#ffb703",
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className={styles.card}
            bordered={false}
          >
            <Statistic
            className={styles.card__title}
              title="Приостановлено"
              value={licenseStats.suspended}
              valueStyle={{ color: "#fff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              background: "#ef233c",
              borderRadius: "8px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className={styles.card}
            bordered={false}
          >
            <Statistic
              className={styles.card__title}
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
