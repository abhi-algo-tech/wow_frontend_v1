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
const { Option } = Select;

// Sample student data
const students = [
  {
    id: 1,
    name: "Ajay",
    avatar: "/classroom_icons/png/Ajay.png",
    flags: ["Notes", "Allergies", "Dietary-Restrictions", "no-photo"],
    status: "",
  },
  {
    id: 2,
    name: "Lex",
    avatar: "/classroom_icons/png/Lex.png",
    flags: ["Notes", "Dietary-Restrictions", "Allergies"],
    status: "",
  },
  {
    id: 3,
    name: "Lisa",
    avatar: "/classroom_icons/png/Lisa.png",
    flags: ["Medication", "no-photo"],
    status: "",
  },
  {
    id: 4,
    name: "Keri",
    avatar: "/classroom_icons/png/Keri.png",
    flags: ["Notes", "Dietary-Restrictions", "no-photo"],
    status: "present",
  },
  {
    id: 5,
    name: "Erica",
    avatar: "/classroom_icons/png/Erica.png",
    flags: ["Notes", "Medication"],
    status: "present",
  },
  {
    id: 6,
    name: "Robert",
    avatar: "/classroom_icons/png/Robert.png",
    flags: ["Dietary-Restrictions", "Notes"],
    status: "present",
  },
  {
    id: 7,
    name: "Thomas",
    avatar: "/classroom_icons/png/Thomas.png",
    flags: ["Notes", "Dietary-Restrictions", "Allergies"],
    status: "present",
  },
  {
    id: 8,
    name: "Olivia",
    avatar: "/classroom_icons/png/Olivia.png",
    flags: ["Notes", "Dietary-Restrictions", "Allergies"],
    status: "present",
  },
  {
    id: 9,
    name: "Lara",
    avatar: "/classroom_icons/png/Lara.png",
    flags: ["no-photo", "Medication"],
    status: "present",
  },
  {
    id: 10,
    name: "Brux",
    avatar: "/classroom_icons/png/Brux.png",
    flags: ["Dietary-Restrictions", "Allergies", "Notes"],
    status: "absent",
  },
  {
    id: 11,
    name: "Emma",
    avatar: "/classroom_icons/png/Emma.png",
    flags: ["Notes", "Allergies", "Medication"],
    status: "absent",
  },
  {
    id: 12,
    name: "Arvind",
    avatar: "/classroom_icons/png/Ajay.png",
    flags: ["Allergies", "Notes", "Medication"],
    status: "absent",
  },
];

const leftRenderAttendanceData = [
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
const leftRenderDefaultData = [
  { icon: "/wow_icons/png/Nap.png", label: "Nap", modal: "Nap" },
  { icon: "/wow_icons/png/Bathroom.png", label: "Bathroom", modal: "Bathroom" },
  { icon: "/wow_icons/png/Bottle.png", label: "Bottle", modal: "Bottle" },
];
const rightRenderData = [
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
export default function StudentCardDetails() {
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

  // Function to handle "Select All" functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all student IDs
      setSelectedStudents(students.map((student) => student.id));
    } else {
      // Deselect all
      setSelectedStudents([]);
    }
  };

  console.log("isAssignConfirmModalOpen", isAssignConfirmModalOpen);

  // Function to handle individual checkbox changes
  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredStudents = students.filter((student) =>
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

  useEffect(() => {
    setLeftRenderData(leftRenderDefaultData);
  }, []);
  useEffect(() => {
    if (selectedStudents?.length >= 1) {
      setFloatingCardVisible(true);
    } else {
      setFloatingCardVisible(false);
      setCurrentAction("student");
    }
  }, [selectedStudents]);
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
      <div className="d-flex  align-items-center">
        <div className="me-2">
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedStudents.length === students.length}
            style={{ marginBottom: 0 }} /* Remove margin to center-align */
          >
            Select All
          </Checkbox>
        </div>
        <div className="me-2">
          <Select
            style={{ width: 164, height: 33 }}
            className="select-student light-font"
            defaultValue="select-student"
          >
            <Option value="select-student">Select Tag</Option>
          </Select>
        </div>
        <div className="me-2">
          <Select
            style={{ width: 164, height: 33 }}
            className="select-student light-font"
            defaultValue="select-student"
          >
            <Option value="select-student">Select Status</Option>
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
