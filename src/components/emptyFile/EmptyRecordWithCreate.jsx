import React from "react";
import { Empty } from "antd";
import ButtonComponent from "../ButtonComponent";

const EmptyRecordWithCreate = ({
  btnLabel,
  gradient,
  buttonActionType = "create",
  setModalOpen,
}) => (
  <div
    style={{
      position: "absolute", // Make sure the div takes full screen
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Center content both horizontally and vertically
    }}
  >
    <Empty
      imageStyle={{
        height: 60,
      }}
      description={
        <strong>No Record Found!</strong>
        // <Typography.Text>
        //   Customize <a href="#API">Description</a>
        // </Typography.Text>
      }
    >
      <ButtonComponent
        text={btnLabel}
        gradient={gradient}
        buttonActionType={buttonActionType}
        onClick={() => setModalOpen(true)}
      />
    </Empty>
  </div>
);

export default EmptyRecordWithCreate;
