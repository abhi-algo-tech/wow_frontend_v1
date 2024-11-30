import { Avatar, Col, Row } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
function AssignConfirm({ setCancel }) {
  const handleCancelClick = () => {
    setCancel(false);
  };
  return (
    <div className="card modal-card-padding">
      <span className="modal-card-label-name">Assign to 1-Blue-D</span>
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

export default AssignConfirm;
