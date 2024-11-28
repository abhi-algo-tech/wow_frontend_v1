import { Avatar, Col, DatePicker, Input, Row, TimePicker } from "antd";
import dayjs from "dayjs";
import ButtonComponent from "../ButtonComponent";
import { useState } from "react";
const { TextArea } = Input;
function CreateMessage({ setCancel }) {
  const [value, setValue] = useState("");
  const handleCancelClick = () => {
    setCancel(false);
  };
  return (
    <div className="card modal-card-padding">
      <span className="modal-card-label-name">Create Message</span>
      <Row gutter={9}>
        <Col span={8}>
          <Row className="modal-card-actor-details-border" align="middle">
            <Col>
              <Avatar src={"/classroom_icons/png/Ajay.png"} />
              <span className="actor-label" style={{ marginLeft: "8px" }}>
                Ajay
              </span>
            </Col>
            <Col>
              <Avatar
                className="modal-card-action-icon"
                src={"/classroom_icons/png/delete.png"}
              />
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Row className="modal-card-actor-details-border" align="middle">
            <Col>
              <Avatar src={"/classroom_icons/png/Lex.png"} />
              <span className="actor-label" style={{ marginLeft: "8px" }}>
                Lex
              </span>
            </Col>
            <Col>
              <Avatar
                className="modal-card-action-icon"
                src={"/classroom_icons/png/delete-1.png"}
              />
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Row className="modal-card-actor-details-border" align="middle">
            <Col>
              <Avatar src={"/classroom_icons/png/Lisa.png"} />
              <span className="actor-label" style={{ marginLeft: "8px" }}>
                Lisa
              </span>
            </Col>
            <Col>
              <Avatar
                className="modal-card-action-icon"
                src={"/classroom_icons/png/delete.png"}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Date and Time */}
      <Row>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter Message"
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />
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

export default CreateMessage;
