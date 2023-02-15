import React, { FC, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import useWindowDimensions from "../util/useWindowDimensions";
import BulletPoint from "./BulletPoint";

const Limitations: FC = () => {
  const widthThreshold = 750;

  const { width } = useWindowDimensions();

  const [hide, setHide] = useState(
    localStorage.getItem("showLimitations") === "true" ? true : false
  );

  const onHide = (hide: boolean) => {
    localStorage.setItem("showLimitations", JSON.stringify(hide));
    setHide(hide);
  };

  const content = () => {
    return (
      <>
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
            style={{
              color: "#ffc800",
              fontSize: 23,
              marginRight: 15,
            }}
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
      </>
    );
  };

  return (
    <>
      <Card
        style={
          !hide && width > widthThreshold
            ? {
                position: "absolute",
                left: 30,
                height: "55vh",
                width: "25vw",
                backgroundColor: "rgb(64, 65, 78)",
                transition: "all 0.8s ease",
              }
            : {
                position: "absolute",
                left: 0,
                width: 30,
                height: "10vh",
                backgroundColor: "rgb(64, 65, 78)",
                transition: "all 0.8s ease",
              }
        }
        className={`shadow ${hide ? "pointer" : ""}`}
        onClick={hide ? () => onHide(false) : () => null}
      >
        {!hide && width > widthThreshold ? (
          <>
            <div className="animate__animated animate__fadeIn animate__slower">
              <i
                className="fa-solid fa-left-long pointer"
                style={{ position: "absolute", top: 5, left: 10, fontSize: 20 }}
                onClick={() => onHide(true)}
              />
              {content()}
            </div>
          </>
        ) : (
          <>
            <i
              className="fa-solid fa-right-long pointer"
              style={{
                position: "absolute",
                top: "40%",
                left: 3,
                fontSize: 20,
              }}
            />
            {!hide && (
              <>
                <Modal show={true} onHide={() => onHide(true)}>
                  <div
                    style={{
                      height: "60vh",
                      width: "100%",
                      backgroundColor: "#282c34",
                      display: "flex",
                      flexDirection: "column",
                      //   justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-x pointer"
                      style={{
                        color: "white",
                        position: "absolute",
                        top: 15,
                        right: 15,
                      }}
                      onClick={() => onHide(true)}
                    />
                    {content()}
                  </div>
                </Modal>
              </>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default Limitations;
