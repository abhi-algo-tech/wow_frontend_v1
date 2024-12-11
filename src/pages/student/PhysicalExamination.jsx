import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { Card, Col, Dropdown, Row, Tag, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import CommonModalComponent from "../../components/CommonModalComponent";
import PhysicalExaminationForm from "./PhysicalExaminationForm";
import {
  useGetAllPhysicalTrackersByStudent,
  useUpdatePhysicalTracker,
} from "../../hooks/usePhysicalTracker";
import { formatDateToCustomStyle } from "../../services/common";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { CustomMessage } from "../../utils/CustomMessage";
const { Text } = Typography;
function PhysicianExamination({ studentId }) {
  const [
    isCreatePhysicianExaminationModalOpen,
    setCreatePhysicianExaminationModalOpen,
  ] = useState(false);

  const {
    data: PhysicalTrackers,
    isLoading,
    isError,
  } = useGetAllPhysicalTrackersByStudent(studentId);

  const updatePhysicalTrackerMutation = useUpdatePhysicalTracker();
  const { data: status } = useMasterLookupsByType("physical_status");
  const handleMenuClick = ({ key, trackerId }) => {
    const payload = {
      statusId: key,
    };
    updatePhysicalTrackerMutation.mutate(
      {
        trackerId: trackerId,
        trackerData: payload,
      },
      {
        onSuccess: () => {
          CustomMessage.success("Physical Tracker updated successfully!");
        },
        onError: (error) => {
          CustomMessage.error(
            `Failed to update Physical Tracker: ${error.message}`
          );
        },
      }
    );
  };

  const menu = (trackerId) => ({
    items:
      status?.data?.map((item) => ({
        key: item?.id,
        label: <span className="student-table-action-label">{item?.name}</span>,
        trackerId: trackerId, // Pass the trackerId to the menu's click handler
      })) || [],
    onClick: (e) => handleMenuClick({ key: e.key, trackerId }),
  });

  const statusColors = {
    Completed: "green",
    Overdue: "red",
    Scheduled: "blue",
    Due: "orange",
  };
  return (
    <>
      <div className="padding16">
        <div className=" text-end mb-4 ">
          <ButtonComponent
            text="Add Details"
            buttonActionType="create"
            onClick={() => setCreatePhysicianExaminationModalOpen(true)}
          />
        </div>

        <Row gutter={[20, 0]}>
          {PhysicalTrackers?.data?.map((tracker) => (
            <Col span={12}>
              <Card
                bordered={false}
                style={{ padding: 0 }}
                className="d-flex flex-column w-100 mb16 card-border"
              >
                <Row className="mb-2">
                  <Col span={12}>
                    <Tag color={statusColors[tracker?.statusName] || "gray"}>
                      {tracker?.statusName}
                    </Tag>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Dropdown menu={menu(tracker?.id)} trigger={["click"]}>
                      <EllipsisOutlined className="pointer" />
                    </Dropdown>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Text className="student-about-tab-label">
                      Checkup Dates
                    </Text>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Text className="student-about-tab-label-value">
                      {tracker?.physicalDate
                        ? formatDateToCustomStyle(tracker.physicalDate)
                        : "N/A"}
                    </Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {isCreatePhysicianExaminationModalOpen && (
        <CommonModalComponent
          open={isCreatePhysicianExaminationModalOpen}
          setOpen={setCreatePhysicianExaminationModalOpen}
          modalWidthSize={418}
          modalHeightSize={547}
          isClosable={true}
        >
          <PhysicalExaminationForm
            CardTitle={"Add Physical Examination Details"}
            studentId={studentId}
            closeModal={() => setCreatePhysicianExaminationModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default PhysicianExamination;
