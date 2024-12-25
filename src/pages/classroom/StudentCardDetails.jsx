import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StudentActivityDetails from "../student/StudentActivityDetails";
import ActorBigCard from "../../components/ActorBigCard";
import CommonModalComponent from "../../components/CommonModalComponent";
import SignIn from "./SignIn";
import SignOut from "../../components/attendance/SignOut";
import Transfer from "./Transfer";
import MarkAbsent from "./MarkAbsent";
import ActivitySubMenu from "./ActivitySubMenu";
import ActivityIconSubMenu from "./ActivityIconSubMenu";
import CreateMessage from "../../components/message/CreateMessage";
import AssignConfirm from "./AssignConfirm";
import { useStudentByClassroom } from "../../hooks/useStudent";
import { formatStudentData } from "./ClassroomCommon";
import LoaderComponent from "../../components/loader/LoaderComponent";
import EmptyRecordWithCreate from "../../components/emptyFile/EmptyRecordWithCreate";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
const { Option } = Select;

// Sample student data

export const leftRenderAttendanceData = [
  {
    icon: "/classroom_icons/png/Sign in.png",
    label: "Sign In",
    modal: "signin",
  },
  {
    icon: "/classroom_icons/png/Sign out.png",
    label: "Sign Out",
    modal: "signout",
  },
  {
    icon: "/classroom_icons/png/transfer.png",
    label: "Transfer",
    modal: "Transfer",
  },
  {
    icon: "/classroom_icons/png/Mark absent.png",
    label: "Absent",
    modal: "Absent",
  },
];
export const leftRenderDefaultData = [
  { icon: "/wow_icons/png/Nap.png", label: "Nap", modal: "Nap" },
  { icon: "/wow_icons/png/Bathroom.png", label: "Bathroom", modal: "Bathroom" },
  { icon: "/wow_icons/png/Bottle.png", label: "Bottle", modal: "Bottle" },
];
export const rightRenderData = [
  {
    icon: "/wow_icons/png/Attendance.png",
    label: "Attendance",
    modal: "Attendance",
  },
  {
    icon: "/wow_icons/png/Activities-7.png",
    label: "Activity",
    modal: "Activity",
  },
  {
    icon: "/wow_icons/png/chat-white-bg.png",
    label: "Message",
    modal: "Message",
  },
];
export default function StudentCardDetails({ classroomId }) {
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFloatingCardVisible, setFloatingCardVisible] = useState();
  const [currentAction, setCurrentAction] = useState("student");
  const [leftRenderData, setLeftRenderData] = useState([]);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [isMarkAbsentModalOpen, setMarkAbsentModalOpen] = useState(false);
  const [isActivityIconSubMenuModalOpen, setActivityIconSubMenuModalOpen] =
    useState(false);
  const [isCreateMessageModalOpen, setCreateMessageModalOpen] = useState(false);
  const [isAssignConfirmModalOpen, setAssignConfirmModalOpen] = useState(false);

  const { data: statusData } = useMasterLookupsByType("status");
  const { data: tags } = useMasterLookupsByType("tags");

  const statusOptions = {
    items: statusData?.data?.map((status) => ({
      key: status.id, // Convert id to string as keys are typically strings
      label: status.name, // Use the name property for the label
    })),
  };

  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useStudentByClassroom(classroomId);

  useEffect(() => {
    if (studentData) {
      const formattedData = formatStudentData(studentData);
      // console.log("formattedData:", formattedData);
      setStudents(formattedData);
      setFilterStudents(formattedData);
    }
  }, [studentData]);

  if (isError) return <p>Error: {error.message}</p>;

  // Function to handle "Select All" functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all student IDs
      setSelectedStudents(filterStudents.map((student) => student.id));
    } else {
      // Deselect all
      setSelectedStudents([]);
    }
    if (selectedStudents?.length >= 1) {
      setFloatingCardVisible(false);
    } else {
      setFloatingCardVisible(true);
      setCurrentAction("student");
    }
    setLeftRenderData(leftRenderDefaultData);
  };

  // Function to handle individual checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedStudents?.length >= 1) {
      setFloatingCardVisible(false);
    } else {
      setFloatingCardVisible(true);
      setCurrentAction("student");
    }
    setLeftRenderData(leftRenderDefaultData);
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleStatus = (selectedStatus) => {
    if (selectedStatus === "all") {
      setFilterStudents(students);
    } else {
      const selectedStatusLabel = statusOptions.items.find(
        (status) => status.key === selectedStatus
      )?.label;

      const filtered = students.filter(
        (student) => student.status === selectedStatusLabel
      );
      setFilterStudents(filtered);
    }
  };

  const filteredStudents = filterStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const setShowRightActionCard = (action) => {
    let selectedAction;
    setCurrentAction(action.toLowerCase());
    switch (action.toLowerCase()) {
      case "attendance":
        selectedAction = leftRenderAttendanceData;
        break;
      case "activity":
        setActivityIconSubMenuModalOpen(true);
        selectedAction = leftRenderDefaultData;
        setCurrentAction("student");
        break;
      case "message":
        setCreateMessageModalOpen(true);
        selectedAction = leftRenderDefaultData;
        setCurrentAction("student");
        break;
      default:
        selectedAction = leftRenderDefaultData;
        setCurrentAction("student");
        break;
    }

    setLeftRenderData(selectedAction); // return the data if needed
  };
  const handleModalOpen = (action) => {
    setCurrentAction(action.toLowerCase());
    switch (action.toLowerCase()) {
      case "signin":
        setSignInModalOpen(true);
        break;
      case "signout":
        setSignOutModalOpen(true);
        break;
      case "transfer":
        setTransferModalOpen(true);
        break;
      case "absent":
        setMarkAbsentModalOpen(true);
        break;
      default:
        "";
        break;
    }
  };

  const renderLFloatingRightCard = () => (
    <div className="classroom-students-l-overflowborder text-center">
      {currentAction === "student" ? (
        <div className="label-12-400">Recents</div>
      ) : (
        <></>
      )}
      {leftRenderData.map((data, i) => (
        <div
          key={i}
          className=" d-flex flex-column align-items-center pointer"
          onClick={() => handleModalOpen(data?.modal)}
        >
          <img
            className="classroom-students-r-icon"
            src={data?.icon}
            alt={data?.label}
          />
          <div className="label-14-500 mt16 ">{data?.label}</div>
        </div>
      ))}
    </div>
  );

  const renderRFloatingRightCard = () => (
    <>
      {renderLFloatingRightCard()}
      <div className="classroom-students-r-overflowborder">
        <div
          className="close-icon position-absolute "
          onClick={() => setFloatingCardVisible(false)}
        >
          &#x2715; {/* Unicode for cross icon (✕) */}
        </div>
        {rightRenderData.map((data, i) => (
          <div
            key={i}
            className=" d-flex flex-column align-items-center pointer"
            onClick={() => setShowRightActionCard(data?.label)}
          >
            <img
              className="classroom-students-r-icon"
              src={data?.icon}
              alt={data?.label}
            />
            <div className="label-14-400 text-white mt16">{data?.label}</div>
          </div>
        ))}
      </div>
    </>
  );
  return (
    <div className="container my-3">
      <div>
        {isLoading ? (
          <LoaderComponent isLoading={isLoading} />
        ) : (
          <>
            {students.length > 0 ? (
              <>
                {/* {renderLFloatingRightCard()} */}
                {isFloatingCardVisible && renderRFloatingRightCard()}
                <div className="d-flex align-items-center my-3 justify-content-between">
                  <div>
                    <Input
                      placeholder="Search Students"
                      prefix={<SearchOutlined />}
                      style={{ width: 246, height: 40 }}
                      className="light-font"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <StudentActivityDetails />
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <Checkbox
                      onChange={handleSelectAll}
                      checked={
                        selectedStudents.length === filterStudents.length
                      }
                      style={{ marginBottom: 0 }}
                    >
                      Select All
                    </Checkbox>
                  </div>
                  <div className="me-2">
                    <Select
                      style={{ width: 164, height: 33 }}
                      className="select-student light-font"
                      placeholder="Select Tag"
                    >
                      {/* <Option value="select-student">Select Tag</Option> */}
                      {tags?.data?.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="me-2">
                    <Select
                      style={{ width: 164, height: 33 }}
                      className="select-student light-font"
                      placeholder="Select Status"
                      onChange={handleStatus}
                    >
                      <Option value="all">All</Option>
                      {statusOptions?.items?.map((status) => (
                        <Option key={status.key} value={status.key}>
                          {status.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  {selectedStudents.length >= 1 && (
                    <div>
                      <Button
                        variant="link"
                        onClick={handleSelectAll}
                        style={{ backgroundColor: "#b1afe919", border: "none" }}
                        className="rounded custom-clear-button d-flex align-items-center gap-1"
                      >
                        <span className="clear-text">Clear</span>
                        <img
                          src="/classroom_icons/png/close.png"
                          alt="Close icon"
                          style={{ width: "8.3px", height: "8.3px" }}
                        />
                      </Button>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    height: "393px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <div className="row mt16">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2"
                      >
                        <ActorBigCard
                          actor={student}
                          selectedActors={selectedStudents}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <EmptyRecordWithCreate btnLabel="Add Student" />
              </>
            )}
          </>
        )}
      </div>

      {isSignInModalOpen && (
        <CommonModalComponent
          open={isSignInModalOpen}
          setOpen={setSignInModalOpen}
          modalWidthSize={549}
        >
          <SignIn setCancel={setSignInModalOpen} />
        </CommonModalComponent>
      )}
      {isSignOutModalOpen && (
        <CommonModalComponent
          open={isSignOutModalOpen}
          setOpen={setSignOutModalOpen}
          modalWidthSize={549}
        >
          <SignOut setCancel={setSignOutModalOpen} />
        </CommonModalComponent>
      )}
      {isTransferModalOpen && (
        <CommonModalComponent
          open={isTransferModalOpen}
          setOpen={setTransferModalOpen}
          modalWidthSize={549}
        >
          <Transfer setCancel={setTransferModalOpen} />
        </CommonModalComponent>
      )}
      {isMarkAbsentModalOpen && (
        <CommonModalComponent
          open={isMarkAbsentModalOpen}
          setOpen={setMarkAbsentModalOpen}
          modalWidthSize={549}
        >
          <MarkAbsent setCancel={setMarkAbsentModalOpen} />
        </CommonModalComponent>
      )}
      {isActivityIconSubMenuModalOpen && (
        <CommonModalComponent
          open={isActivityIconSubMenuModalOpen}
          setOpen={setActivityIconSubMenuModalOpen}
          modalWidthSize={804}
          isClosable={true}
        >
          <ActivityIconSubMenu />
          {/* <ActivitySubMenu setCancel={setMarkAbsentModalOpen} /> */}
        </CommonModalComponent>
      )}
      {isCreateMessageModalOpen && (
        <CommonModalComponent
          open={isCreateMessageModalOpen}
          setOpen={setCreateMessageModalOpen}
          modalWidthSize={549}
        >
          <CreateMessage
            setCancel={setCreateMessageModalOpen}
            setAssignConfirm={setAssignConfirmModalOpen}
          />
        </CommonModalComponent>
      )}
      {isAssignConfirmModalOpen && (
        <CommonModalComponent
          open={isAssignConfirmModalOpen}
          setOpen={setAssignConfirmModalOpen}
          modalWidthSize={402}
        >
          <AssignConfirm setCancel={setAssignConfirmModalOpen} />
        </CommonModalComponent>
      )}
    </div>
  );
}
