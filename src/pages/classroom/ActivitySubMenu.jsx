import { Col, DatePicker, Input, Row, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import ButtonComponent from "../../components/ButtonComponent";
import ActorCard from "../../components/ActorCard";

function ActivitySubMenu({ setCancel }) {
  const handleCancelClick = () => {
    setCancel(false);
  };

  return (
    <div className="card modal-card-padding">
      {/* Date and Time */}
      <Row justify="space-between" className="align-items-center">
        <Col>
          <span className="modal-card-label-name">Photo / Video</span>
        </Col>
        <Col>
          <DatePicker
            defaultValue={dayjs("2024-10-29")}
            format="MMM DD, YYYY"
            className="w-full modal-card-calender mr10"
          />
          <TimePicker
            defaultValue={dayjs("12:31", "HH:mm")}
            format="h:mm A"
            className="w-full modal-card-calender"
          />
        </Col>
      </Row>
      <div className="mx-3">
        <ActorCard />
      </div>
      <div className="  text-center main-body-activity-submenu-img">
        <img
          className="activity-submenu-img"
          src="/classroom_icons/png/Upload-Image.png"
          alt="images"
        />
        <br />
        <span>Upload Images</span>
      </div>
      <Input className="activity-submenu-input" placeholder="Remarks" />

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

export default ActivitySubMenu;
