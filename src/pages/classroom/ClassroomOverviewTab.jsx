import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Tabs,
  TimePicker,
} from "antd";
import React, { useState } from "react";
import StudentCardDetails from "./StudentCardDetails";
import CommonModalComponent from "../../components/CommonModalComponent";
import dayjs from "dayjs";
import ButtonComponent from "../../components/ButtonComponent";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Transfer from "./Transfer";
import MarkAbsent from "./MarkAbsent";
import StaffCardDetails from "./StaffCardDetails";
import ActivitySubMenu from "./ActivitySubMenu";

const { TabPane } = Tabs;

function ClassroomOverviewTab() {
  const [activeTab, setActiveTab] = useState("1");
  const [isAssignStudentModalOpen, setAssignStudent] = useState(false);

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const renderRightTab = () => {
    if (Number(activeTab) === 1) {
      return (
        <div
          onClick={() => setAssignStudent(true)}
          className={"right-tab-active"}
        >
          <img
            className="inner-text-icons"
            src="/classroom_icons/png/Assign_icon.png"
            alt="assign icon"
          />
          <span className="inner-text">Assign Student</span>
        </div>
      );
    } else if (Number(activeTab) === 2) {
      return (
        <div
          onClick={() => setAssignStudent(true)}
          className={"right-tab-active"}
        >
          <img
            className="inner-text-icons"
            src="/classroom_icons/png/Assign_icon.png"
            alt="assign icon"
          />
          <span className="inner-text">Assign Staff</span>
        </div>
      );
    } else if (Number(activeTab) === 3) {
      return (
        <Button
          type="primary"
          //   icon={<PlusOutlined />}
          style={{
            backgroundColor: "#FFA500",
            borderColor: "#FFA500",
          }}
        >
          Add Program
        </Button>
      );
    }
    // <div onClick={() => setActiveTab("4")} className={"right-tab-active"}>
    //   <span className="inner-text">Right-Side Tab</span>
    // </div>
  };

  const defaultDate = new Date("2024-10-29");
  const defaultTime = new Date();
  defaultTime.setHours(12, 31);

  const renderFloatingRigthCard = () => (
    <div className="overflowCard-left">
      <Card className="">
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/Sign in.png"
            />
          </div>
          <div className="overflowBorder-label">Sign In</div>
        </div>
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/Sign out.png"
            />
          </div>
          <div className="overflowBorder-label">Sign Out</div>
        </div>
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/transfer.png"
            />
          </div>
          <div className="overflowBorder-label">Transfer</div>
        </div>
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/Mark absent.png"
            />
          </div>
          <div className="overflowBorder-label">Absent</div>
        </div>
      </Card>
    </div>
  );
  const renderFloatingLeftCard = () => (
    <div className="overflowCard">
      <Card className="overflowborder">
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/Sign in.png"
            />
          </div>
          <div className="overflowBorder-label">Sign In</div>
        </div>
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/Sign out.png"
            />
          </div>
          <div className="overflowBorder-label">Sign Out</div>
        </div>
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/transfer.png"
            />
          </div>
          <div className="overflowBorder-label">Transfer</div>
        </div>
        <div className="overflowborder-icon-label">
          <div>
            <img
              className="overflowBorder-icon"
              src="/classroom_icons/png/Mark absent.png"
            />
          </div>
          <div className="overflowBorder-label">Absent</div>
        </div>
      </Card>
    </div>
  );

  return (
    <>
      <Tabs
        activeKey={activeTab}
        type="card"
        onChange={onTabChange}
        tabBarExtraContent={renderRightTab()}
        className="classroom-custom-tabs"
      >
        <TabPane tab={<span>Students</span>} key="1">
          <StudentCardDetails />
        </TabPane>

        <TabPane tab={<span>Staff</span>} key="2">
          <StaffCardDetails />
        </TabPane>

        <TabPane tab={<span>Notes</span>} key="3">
          <span>Notes Content</span>
        </TabPane>
      </Tabs>

      {/* Render the floating card */}
      {/* {renderFloatingRigthCard()} */}
      {/* {renderFloatingLeftCard()} */}
      {isAssignStudentModalOpen && (
        <CommonModalComponent
          open={isAssignStudentModalOpen}
          setOpen={setAssignStudent}
          modalWidthSize={549}
        >
          <SignIn setCancel={setAssignStudent} />
          {/* <SignOut setCancel={setAssignStudent} /> */}
          {/* <Transfer setCancel={setAssignStudent} /> */}
          {/* <MarkAbsent setCancel={setAssignStudent} /> */}
          {/* <ActivitySubMenu setCancel={setAssignStudent} /> */}
        </CommonModalComponent>
      )}
    </>
  );
}

export default ClassroomOverviewTab;