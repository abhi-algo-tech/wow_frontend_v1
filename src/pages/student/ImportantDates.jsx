import { Avatar, Badge, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import ImportantDateForm from "./ImportantDateForm";
import CommonModalComponent from "../../components/CommonModalComponent";
import { useStudentById } from "../../hooks/useStudent";

const { Text } = Typography;

// Reusable component for displaying labeled rows
const InfoRow = ({ label, value }) => (
  <Row className="mb20">
    <Col span={9}>
      <Text className="student-about-tab-label">{label}</Text>
    </Col>
    <Col span={15}>
      <Text className="student-about-tab-label-value">{value || "N/A"}</Text>
    </Col>
  </Row>
);

function ImportantDates({ studentId }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [studentData, setStudentData] = useState();

  const {
    data: student,
    isLoading,
    error,
    refetch,
  } = useStudentById(studentId);

  useEffect(() => {
    setStudentData(student?.data || {});
  }, [student]);

  const handleEditClick = () => setModalOpen(true);
  const closeModal = async () => {
    setModalOpen(false);
    await refetch();
  };

  return (
    <>
      <div className="padding30 important-dates-page">
        {/* Floating Edit Button */}
        <div
          className="pointer about-floating-edit-div"
          style={{ position: "absolute", top: 16, right: 30, zIndex: 10 }}
        >
          <Badge>
            <Avatar
              shape="square"
              icon={<MdOutlineModeEditOutline />}
              onClick={handleEditClick}
            />
          </Badge>
        </div>

        {/* Display important dates */}
        <InfoRow label="Enroll Date" value={studentData?.registrationDate} />
        <InfoRow label="School Start Date" value={studentData?.startDate} />
        <InfoRow
          label="Current Classroom Start Date"
          value={studentData?.roomStartDate}
        />
        <InfoRow
          label="Upcoming Move Date"
          value={studentData?.expectedMoveDate}
        />
        <InfoRow label="School Leaving Date" value={studentData?.leavingDate} />
      </div>

      {/* Modal for editing important dates */}
      {isModalOpen && (
        <CommonModalComponent
          open={isModalOpen}
          setOpen={setModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <ImportantDateForm
            CardTitle="Edit Important Dates"
            closeModal={closeModal}
            studentData={studentData}
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default ImportantDates;
