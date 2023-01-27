import React, { FC } from "react";
import { Card } from "react-bootstrap";
import BulletPoint from "./BulletPoint";

const Limitations: FC = () => {
  return (
    <Card
      style={{
        position: "absolute",
        left: 30,
        height: "55vh",
        width: "25vw",
        backgroundColor: "rgb(64, 65, 78)",
      }}
      className="shadow"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i
          className="fa-solid fa-triangle-exclamation"
          style={{ color: "#ffc800", fontSize: 23, marginRight: 15 }}
        ></i>
        <h4 style={{ marginTop: 8.75 }}>Limitations</h4>
      </div>
      <div
        style={{
          height: 2,
          width: "90%",
          marginLeft: "5%",
          backgroundColor: "grey",
        }}
      />
      <ul>
        <BulletPoint
          label="May Not Generate Content with 100% Accuracy"
          count={4}
        />
        <BulletPoint label="Chance Of Images Not Being Relevant" count={4} />
        <BulletPoint
          label="Limited Knowledge of Events Within the Last Year"
          count={4}
        />
        <BulletPoint
          label="Rare Possibility of Biased Content Produced"
          count={4}
        />
      </ul>
    </Card>
  );
};

export default Limitations;
