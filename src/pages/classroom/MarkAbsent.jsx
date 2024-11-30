import { Avatar, Col, DatePicker, Row, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import ButtonComponent from "../../components/ButtonComponent";
import ActorCard from "../../components/ActorCard";

function MarkAbsent({ setCancel }) {
  const handleCancelClick = () => {
    setCancel(false);
  };

  return (
    <div className="card modal-card-padding">
      <span className="modal-card-label-name">Mark Absent</span>
      <ActorCard />

      {/* Date and Time */}
      <Row>
        <Col className="mr-10">
          <div>
            <label className="model-card-calender-label">Date</label>
          </div>
          <DatePicker
            defaultValue={dayjs("2024-10-29")}
            format="MMM DD, YYYY"
            className="w-full modal-card-calender"
          />
        </Col>
      </Row>
      <div className="text-center">
        <ButtonComponent
          text="Cancel"
          padding={"16px 62.6px"}
          margin="0 16px 0 0"
          onClick={handleCancelClick}
          gradient={false}
        />

        <ButtonComponent
          text="Submit"
          gradient={true}
          padding={"16px 62.6px"}
        />
      </div>
    </div>
  );
}

export default MarkAbsent;
