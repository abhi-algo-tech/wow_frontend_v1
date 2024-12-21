import { Avatar, Button, Dropdown, Select, Typography } from "antd";
import React, { useState } from "react";
import CommonModalComponent from "../../components/CommonModalComponent";
import ScheduleTable from "./ScheduleTable";
import ShiftForm from "./ShiftForm";
import dayjs from "dayjs";
import CopyShiftForm from "./CopyShiftForm";
import WeekDatePicker from "../../components/datepicker/WeekDatePicker";
import DeleteSchedulePopUp from "../../components/DeleteSchedulePopup";
import DeleteShift from "./DeleteShift";
import PublishShift from "./PublishShift";
import OverviewTable from "./OverviewTable";
import ScheduleView from "./ScheduleView";
import SingleDatePicker from "../../components/datepicker/SingleDatePicker";

const { Text } = Typography;
const ClassroomView = () => {
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);
  const [isCopyShiftModalOpen, setCopyShiftModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [isDeleteShiftModalOpen, setDeleteShiftModalOpen] = useState(false);
  const [isPublishedShiftModalOpen, setPublishedShiftModalOpen] =
    useState(false);
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Start from Monday
  const handleRangeChange = (start, end) => {
    setStartDate(start);
  };

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };
  const handleDelete = async (id) => {};

  const publishItems = [
    { key: "1", label: "Next Month" },
    { key: "2", label: "All Shifts" },
  ];
  const classRoomList = [
    { id: 1, name: "1-Blue-D" },
    { id: 2, name: "Pink-Rose" },
    { id: 3, name: "R-Red" },
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex gap-3">
          <SingleDatePicker onRangeChange={handleRangeChange} gap={10} />
          <Select
            className="select-student-add-from"
            placeholder="Select Classroom"
            style={{ width: 185 }}
          >
            {classRoomList?.map((classroom) => (
              <Select.Option key={classroom.id} value={classroom.id}>
                {classroom.name}
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
              <Avatar size={24} src={"/wow_icons/png/add.png"} /> Add Shift
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
      {/* <OverviewTable /> */}
      <ScheduleView />
    </>
  );
};

export default ClassroomView;
