import { Avatar, Badge, Col, Row, Typography } from "antd";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import ImportantDateForm from "./ImportantDateForm";
import CommonModalComponent from "../../components/CommonModalComponent";

const { Text } = Typography;

const LabelCol = ({ children }) => (
  <Col span={9}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={15}>{children}</Col>;

function ImportantDates() {
  const [isCreateImportantDatesModalOpen, setCreateImportantDatesModalOpen] = useState(false);
  return (
    <>
      <div className="padding30 important-dates-page">
        {/* Floating Edit Button */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 30,
            margin: "8px",
            zIndex: 10,
          }}
        >
          <Badge className="pointer about-floating-edit-div">
            <Avatar shape="square" icon={<MdOutlineModeEditOutline />} onClick={() => setCreateImportantDatesModalOpen(true)}/>
          </Badge>
        </div>
        <Row gutter={[0, 10]}>
          <LabelCol>Enroll Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Oct 23, 2024</Text>
          </ContentCol>

          <LabelCol>School Start Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Oct 27, 2024</Text>
          </ContentCol>

          <LabelCol>Current Classroom Start Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Nov 03, 2024</Text>
          </ContentCol>

          <LabelCol>Upcoming Move Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Nov 17, 2024</Text>
          </ContentCol>
          <LabelCol>School Leaving Date</LabelCol>
          <ContentCol>
            <Text className="student-about-tab-label-value">Nov 29, 2024</Text>
          </ContentCol>
        </Row>
      </div>
      {isCreateImportantDatesModalOpen && (
        <CommonModalComponent
          open={isCreateImportantDatesModalOpen}
          setOpen={setCreateImportantDatesModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <ImportantDateForm
            CardTitle={"Edit Important Dates"}
            classroomId={null}
            closeModal={() => setCreateImportantDatesModalOpen(false)}
          />
        
        </CommonModalComponent>
      )}
    </>
  );
}

export default ImportantDates;
