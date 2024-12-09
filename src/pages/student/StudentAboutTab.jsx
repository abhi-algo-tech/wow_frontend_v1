import { Button, Card, Tabs } from "antd";
import React, { useState } from "react";
import StudentAbout from "./StudentAbout";
import Family from "./Family";
import Pickup from "./Pickup";

const { TabPane } = Tabs;

function StudentAboutTab({ studentId }) {
  const [activeTab, setActiveTab] = useState("1");
  const [isAssignStudentModalOpen, setAssignStudent] = useState(false);

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        type="card"
        onChange={onTabChange}
        // tabBarExtraContent={renderRightTab()}
        className="student-custom-tabs"
      >
        <TabPane tab={<span>About</span>} key="1">
          <StudentAbout studentId={studentId} />
        </TabPane>

        <TabPane tab={<span>Family</span>} key="2">
          <Family studentId={studentId} />
        </TabPane>

        <TabPane tab={<span>Pickup</span>} key="3">
          <Pickup studentId={studentId} />
        </TabPane>
      </Tabs>
      {/* <Tabs
          activeKey={activeTab}
          type="card"
          onChange={onTabChange}
          className="classroom-custom-tabs"
        >
          <TabPane tab={<span>About</span>} key="1">
            <StudentAbout />
          </TabPane>

          <TabPane tab={<span>Family</span>} key="2">
                  <span>Notes Content</span>
          </TabPane>

          <TabPane tab={<span>Pickup</span>} key="3">
            <span>Notes Content</span>
          </TabPane>
        </Tabs> */}

      {/* {isAssignStudentModalOpen && (
          <CommonModalComponent
            open={isAssignStudentModalOpen}
            setOpen={setAssignStudent}
            modalWidthSize={549}
          >
            <SignIn setCancel={setAssignStudent} />
          </CommonModalComponent>
        )} */}
    </>
  );
}

export default StudentAboutTab;
