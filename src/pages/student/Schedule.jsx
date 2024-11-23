import { Avatar, Badge, Col, Row, Tag, Typography } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import { MdOutlineModeEdit } from "react-icons/md";

const { Text } = Typography;

const LabelCol = ({ children }) => (
  <Col span={9}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={15}>{children}</Col>;

function Schedule() {
  return (
    <>
      <div className="padding16 important-dates-page">
        <div className=" text-end mb-4 ">
          <ButtonComponent text="Add/Edit Schedule" buttonActionType="create" />
        </div>
        <Row gutter={[4, 0]} className="w-100">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day) => (
              <Col key={day}>
                <Row
                  className="d-flex flex-column align-items-center"
                  style={{ gap: "4px" }}
                >
                  <Tag
                    color="purple"
                    className="schedule-days text-center mb12"
                  >
                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                      {day}
                    </div>
                  </Tag>
                  {day !== "Monday" ? (
                    <Row>
                      <Tag
                        className=" text-center bg-white"
                        style={{ width: 72, height: 28 }}
                      >
                        <div style={{ fontSize: "10px" }}>07:00AM</div>
                      </Tag>
                      <Tag
                        className=" text-center bg-white"
                        style={{ width: 64, height: 28 }}
                      >
                        <div style={{ fontSize: "10px" }}>05:30PM</div>
                      </Tag>
                    </Row>
                  ) : (
                    <Tag
                      className=" text-center bg-white"
                      style={{ width: 74, height: 28 }}
                    >
                      <div style={{ fontSize: "10px" }}>-</div>
                    </Tag>
                  )}
                </Row>
              </Col>
            )
          )}
        </Row>
      </div>
    </>
  );
}

export default Schedule;
