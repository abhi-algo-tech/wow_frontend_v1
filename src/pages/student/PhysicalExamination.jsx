// import React, { useState } from "react";
// import ButtonComponent from "../../components/ButtonComponent";
// import { Card, Col, Dropdown, Row, Tag, Typography } from "antd";
// import { EllipsisOutlined } from "@ant-design/icons";
// import CommonModalComponent from "../../components/CommonModalComponent";
// import PhysicalExaminationForm from "./PhysicalExaminationForm";
// import {
//   useGetAllPhysicalTrackersByStudent,
//   useUpdatePhysicalTracker,
// } from "../../hooks/usePhysicalTracker";
// import { formatDateToCustomStyle } from "../../services/common";
// import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
// import { CustomMessage } from "../../utils/CustomMessage";
// const { Text } = Typography;
// function PhysicianExamination({ studentId }) {
//   const [
//     isCreatePhysicianExaminationModalOpen,
//     setCreatePhysicianExaminationModalOpen,
//   ] = useState(false);

//   const {
//     data: PhysicalTrackers,
//     isLoading,
//     isError,
//   } = useGetAllPhysicalTrackersByStudent(studentId);

//   const updatePhysicalTrackerMutation = useUpdatePhysicalTracker();
//   const { data: status } = useMasterLookupsByType("physical_status");
//   const handleMenuClick = ({ key, trackerId }) => {
//     const payload = {
//       statusId: key,
//     };
//     updatePhysicalTrackerMutation.mutate(
//       {
//         trackerId: trackerId,
//         trackerData: payload,
//       },
//       {
//         onSuccess: () => {
//           CustomMessage.success("Physical Examination updated successfully!");
//         },
//         onError: (error) => {
//           CustomMessage.error(
//             `Failed to update Physical Examination: ${error.message}`
//           );
//         },
//       }
//     );
//   };

//   const menu = (trackerId) => ({
//     items:
//       status?.data?.map((item) => ({
//         key: item?.id,
//         label: <span className="student-table-action-label">{item?.name}</span>,
//         trackerId: trackerId, // Pass the trackerId to the menu's click handler
//       })) || [],
//     onClick: (e) => handleMenuClick({ key: e.key, trackerId }),
//   });

//   const statusColors = {
//     Completed: "green",
//     Overdue: "red",
//     Scheduled: "blue",
//     Due: "orange",
//   };
//   return (
//     <>
//       <div className="padding16">
//         <div className=" text-end mb-4 ">
//           <ButtonComponent
//             text="Add Details"
//             buttonActionType="create"
//             onClick={() => setCreatePhysicianExaminationModalOpen(true)}
//           />
//         </div>

//         <Row gutter={[20, 0]}>
//           {PhysicalTrackers?.data?.map((tracker) => (z
//             <Col span={12}>
//               <Card
//                 bordered={false}
//                 style={{ padding: 0 }}
//                 className="d-flex flex-column w-100 mb16 card-border"
//               >
//                 <Row className="mb-2">
//                   <Col span={12}>
//                     <Tag color={statusColors[tracker?.statusName] || "gray"}>
//                       {tracker?.statusName}
//                     </Tag>
//                   </Col>
//                   <Col span={12} style={{ textAlign: "right" }}>
//                     <Dropdown menu={menu(tracker?.id)} trigger={["click"]}>
//                       <EllipsisOutlined className="pointer" />
//                     </Dropdown>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col span={12}>
//                     <Text className="student-about-tab-label">
//                       Checkup Dates
//                     </Text>
//                   </Col>
//                   <Col span={12} style={{ textAlign: "right" }}>
//                     <Text className="student-about-tab-label-value">
//                       {tracker?.physicalDate
//                         ? formatDateToCustomStyle(tracker.physicalDate)
//                         : "N/A"}
//                     </Text>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//       {isCreatePhysicianExaminationModalOpen && (
//         <CommonModalComponent
//           open={isCreatePhysicianExaminationModalOpen}
//           setOpen={setCreatePhysicianExaminationModalOpen}
//           modalWidthSize={418}
//           modalHeightSize={547}
//           isClosable={true}
//         >
//           <PhysicalExaminationForm
//             CardTitle={"Add Physical Examination Details"}
//             studentId={studentId}
//             closeModal={() => setCreatePhysicianExaminationModalOpen(false)}
//           />
//         </CommonModalComponent>
//       )}
//     </>
//   );
// }

// export default PhysicianExamination;

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Dropdown, Space, Tag, Typography, Empty } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import PhysicalExaminationForm from "./PhysicalExaminationForm";
import {
  useDeletePhysicalTracker,
  useGetAllPhysicalTrackersByStudent,
  useUpdatePhysicalTracker,
} from "../../hooks/usePhysicalTracker";
import { formatDateToCustomStyle } from "../../services/common";
import { CustomMessage } from "../../utils/CustomMessage";
import DeletePopUp from "../../components/DeletePopUp"; // Assuming this component is reused for delete confirmation

const { Text } = Typography;

function PhysicianExamination({ studentId }) {
  const [
    isCreatePhysicianExaminationModalOpen,
    setCreatePhysicianExaminationModalOpen,
  ] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTracker, setSelectedTracker] = useState(null);

  const {
    data: PhysicalTrackers,
    isLoading,
    isError,
  } = useGetAllPhysicalTrackersByStudent(studentId);
  const deletePhysicalTrackerMutation = useDeletePhysicalTracker();

  const statusColors = {
    Completed: "green",
    Overdue: "red",
    Scheduled: "blue",
    Due: "orange",
  };

  const handleMenuClick = ({ key, tracker }) => {
    if (key === "edit") {
      setSelectedTracker(tracker);
      setEditModalOpen(true);
    } else if (key === "delete") {
      setSelectedTracker(tracker);
      setDeleteModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      deletePhysicalTrackerMutation.mutate({
        trackerId: id,
      });

      CustomMessage.success(`Successfully deleted Physical Examination: ${id}`);
      setDeleteModalOpen(false); // Close the modal after operation
    } catch (error) {
      CustomMessage.error(
        `Failed to delete Physical Examination: ${error.message}`
      );
    }
  };

  return (
    <>
      <div className="padding16">
        <div className="text-end mb-4">
          <ButtonComponent
            text="Add Details"
            buttonActionType="create"
            onClick={() => setCreatePhysicianExaminationModalOpen(true)}
          />
        </div>
        {PhysicalTrackers?.data?.length > 0 ? (
          <Row gutter={[20, 0]}>
            {PhysicalTrackers?.data?.map((tracker, index) => {
              // Dynamically create the menu for each tracker
              const menu = {
                items: [
                  {
                    key: "edit",
                    label: (
                      <span className="student-table-action-label">Edit</span>
                    ),
                  },
                  {
                    key: "delete",
                    label: (
                      <span className="student-table-action-label">Delete</span>
                    ),
                  },
                ],
                onClick: ({ key }) => handleMenuClick({ key, tracker }),
              };

              return (
                <Col span={12} key={index}>
                  <Card
                    bordered={false}
                    className="d-flex flex-column w-100 mb16 card-border"
                  >
                    <Row className="mb-2">
                      <Col span={12}>
                        <Tag
                          color={statusColors[tracker?.statusName] || "gray"}
                        >
                          {tracker?.statusName}
                        </Tag>
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <Dropdown menu={menu} trigger={["click"]}>
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
              );
            })}
          </Row>
        ) : (
          <Empty />
        )}
      </div>

      {isCreatePhysicianExaminationModalOpen && (
        <CommonModalComponent
          open={isCreatePhysicianExaminationModalOpen}
          setOpen={setCreatePhysicianExaminationModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <PhysicalExaminationForm
            CardTitle={"Add Physical Examination Details"}
            studentId={studentId}
            closeModal={() => setCreatePhysicianExaminationModalOpen(false)}
            module="student"
          />
        </CommonModalComponent>
      )}

      {isEditModalOpen && selectedTracker && (
        <CommonModalComponent
          open={isEditModalOpen}
          setOpen={setEditModalOpen}
          modalWidthSize={418}
          isClosable={true}
        >
          <PhysicalExaminationForm
            CardTitle={"Edit Physical Examination Details"}
            studentId={studentId}
            trackerData={selectedTracker}
            closeModal={() => setEditModalOpen(false)}
            module="student"
          />
        </CommonModalComponent>
      )}

      {isDeleteModalOpen && selectedTracker && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={280}
          isClosable={false}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedTracker}
            handleDelete={() => handleDelete(selectedTracker.id)}
            module="Physical Examination"
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default PhysicianExamination;
