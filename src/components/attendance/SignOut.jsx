import { Avatar, Col, DatePicker, Row, TimePicker } from "antd";
import dayjs from "dayjs";
import ButtonComponent from "../ButtonComponent";
function SignOut({ setCancel }) {
  const handleCancelClick = () => {
    setCancel(false);
  };
  return (
    <div className="card modal-card-padding">
      <span className="modal-card-label-name">Sign-Out</span>
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
        <Col>
          <div>
            <label className="model-card-calender-label">Time</label>
          </div>
          <TimePicker
            defaultValue={dayjs("12:31", "HH:mm")}
            format="h:mm A"
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

export default SignOut;
