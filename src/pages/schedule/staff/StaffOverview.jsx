import { Avatar, Button, Dropdown, Select, Typography } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import WeekDatePicker from "../../../components/datepicker/WeekDatePicker";
import OverviewTable from "../OverviewTable";

const { Text } = Typography;
const StaffOverview = () => {
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Start from Monday
  const handleRangeChange = (start, end) => {
    setStartDate(start);
  };

  const publishItems = [
    { key: "1", label: "Next Month" },
    { key: "2", label: "All Shifts" },
  ];
  const staffList = [
    { id: 1, name: "Jessica Rhodes" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Emily Smith" },
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex gap-3">
          <WeekDatePicker onRangeChange={handleRangeChange} gap={10} />

          <Select
            className="select-student-add-from"
            placeholder="Select Staff"
            style={{ width: 185 }}
          >
            {staffList?.map((staff) => (
              <Select.Option key={staff.id} value={staff.id}>
                {staff.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Button
            onClick={() => setAddShiftModalOpen(true)}
            className="schedule-add-shift-btn"
          >
            <span className="gradient-text">
              {" "}
              <Avatar size={36} src={"/wow_icons/png/add.png"} /> Add Shift
            </span>
          </Button>
          <Dropdown
            menu={{ items: publishItems }}
            placement="bottomRight"
            className="schedule-publish-drp"
          >
            <Button className="schedule-publish-drp-btn">
              <span className="schedule-publish-drp-btn-text">Publish </span>
              <img
                src={"/wow_icons/png/stat_minus_1.png"}
                style={{ width: 12, height: 7 }}
              />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div
        className="staff-scheduling-overview container p-3 mb20"
        style={{
          maxWidth: "1224px",
          background: "white",
          border: "1px solid #E2E2E2",
          borderRadius: "12px",
        }}
      >
        <div className="d-flex justify-content-between align-items-start ">
          {/* Profile Section */}
          <div className="d-flex align-items-center gap-3">
            {/* Avatar Section */}
            <div className="position-relative">
              <Avatar size={88} src="/wow_images/staff.png" />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#52c41a",
                  borderRadius: "50%",
                  border: "4px solid white",
                }}
              />
            </div>

            {/* Text Section */}
            <div className="d-flex flex-column gap-2">
              <div className="label-20-500">Jessica Rhodes</div>
              <div className="label-12-400">Lead Teacher</div>
              <div className="label-12-400">1-Blue-D</div>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="d-flex gap-3">
            <div
              className="d-flex"
              style={{
                width: "256px",
                height: "88px",
                background: "#FFFAEA",
                border: "1px solid rgba(22, 40, 49, 0.1)",
                borderRadius: "12px",
                padding: "12px 19px",
              }}
            >
              {/* Avatar Section */}
              <div className="me-3">
                <Avatar
                  src={"/wow_icons/png/history_toggle_off.png"}
                  size={36}
                />
              </div>

              {/* Text Section */}
              <div>
                <p className="label-16-500 mb1">Available Hours</p>
                <p className="label-32-600 mb-0">36:00</p>
              </div>
            </div>
            <div
              className="d-flex"
              style={{
                width: "256px",
                height: "88px",
                background: "#EAFFFA",
                border: "1px solid rgba(22, 40, 49, 0.1)",
                borderRadius: "12px",
                padding: "12px 19px",
              }}
            >
              {/* Avatar Section */}
              <div className="me-3">
                <Avatar src={"/wow_icons/png/more_time.png"} size={36} />
              </div>

              {/* Text Section */}
              <div>
                <p className="label-16-500 mb1">Scheduled Hours</p>
                <p className="label-32-600 mb-0">36:00</p>
              </div>
            </div>
            <div
              className="d-flex"
              style={{
                width: "256px",
                height: "88px",
                background: "#FFFFFF",
                border: "1px solid rgba(22, 40, 49, 0.1)",
                borderRadius: "12px",
                padding: "12px 19px",
              }}
            >
              {/* Avatar Section */}
              <div className="me-3">
                <Avatar src={"/wow_icons/png/unschedule.png"} size={36} />
              </div>

              {/* Text Section */}
              <div>
                <p className="label-16-500 mb1">Unscheduled Hours</p>
                <p className="label-32-600 mb-0">00:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OverviewTable />
    </>
  );
};

export default StaffOverview;
