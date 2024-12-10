import { Button, Card, Tabs } from "antd";
import React, { useState } from "react";
import StudentAbout from "./StudentAbout";
import Family from "./Family";
import Pickup from "./Pickup";
import HealthDetails from "./HealthDetails";
import PhysicianDetails from "./PhysicianDetails";
import PhysicianExamination from "./PhysicalExamination";
import ImmunizationRecord from "./ImmunizationRecord";

const { TabPane } = Tabs;

function StudentHealthTab({ studentId }) {
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
        <TabPane tab={<span>Health Details</span>} key="1">
          <HealthDetails studentId={studentId} />
        </TabPane>

        <TabPane tab={<span>Physician Details</span>} key="2">
          <PhysicianDetails studentId={studentId} />
        </TabPane>

        <TabPane tab={<span>Physical Examination</span>} key="3">
          <PhysicianExamination />
        </TabPane>
        <TabPane tab={<span>Immunization</span>} key="4">
          <ImmunizationRecord />
        </TabPane>
      </Tabs>

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

export default StudentHealthTab;
