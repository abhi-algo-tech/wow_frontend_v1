import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Tabs,
  Avatar,
  Button,
  Badge,
} from "antd";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { MdOutlineModeEdit, MdOutlineModeEditOutline } from "react-icons/md";
import HealthDetailsForm from "./HealthDetailsForm";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useStudentById } from "../../hooks/useStudent";

const { Text } = Typography;
const { TabPane } = Tabs;

const LabelCol = ({ children }) => (
  <Col span={5}>
    <Text className="student-about-tab-label">{children}</Text>
  </Col>
);

const ContentCol = ({ children }) => <Col span={19}>{children}</Col>;

const HealthDetails = ({ studentId }) => {
  const [isCreateHealthDetailsModalOpen, setCreateHealthDetailsModalOpen] =
    useState(false);
  const { data: studentData, isLoading, error } = useStudentById(studentId);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching student health data</Text>;
  return (
    <div className="padding30">
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
          <Avatar
            shape="square"
            icon={<MdOutlineModeEditOutline />}
            onClick={() => setCreateHealthDetailsModalOpen(true)}
          />
        </Badge>
        {/* <MdOutlineModeEditOutline
          style={{
            width: 24,
            height: 24,
            cursor: "pointer",
            color: "#5978F7",
          }}
          onClick={() => console.log("Edit button clicked")} // Replace with your handler
        /> */}
      </div>
      <Row gutter={[0, 10]}>
        <LabelCol>Allergies</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            {studentData?.data?.allergies}
          </Text>
        </ContentCol>

        <LabelCol>Medication</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            {studentData?.data?.medications}
          </Text>
        </ContentCol>

        <LabelCol>Diet Restrictions</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            {studentData?.data?.dietRestriction}
          </Text>
        </ContentCol>

        {/* <LabelCol>Last Physical Date</LabelCol>
        <ContentCol>
          <Text className="student-about-tab-label-value">
            No Last Physical Date
          </Text>
        </ContentCol> */}
      </Row>
      {isCreateHealthDetailsModalOpen && (
        <CommonModalComponent
          open={isCreateHealthDetailsModalOpen}
          setOpen={setCreateHealthDetailsModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <HealthDetailsForm
            CardTitle={"Edit Student Health Details"}
            studentData={studentData}
            studentId={studentId}
            closeModal={() => setCreateHealthDetailsModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </div>
  );
};

export default HealthDetails;
