import { Avatar, Button, Dropdown, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CommonModalComponent from "../../components/CommonModalComponent";
import ShiftForm from "./ShiftForm";
import dayjs from "dayjs";
import PublishShift from "./PublishShift";
import ScheduleView from "./ScheduleView";
import SingleDatePicker from "../../components/datepicker/SingleDatePicker";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useSession } from "../../hooks/useSession";
import ButtonComponent from "../../components/ButtonComponent";
import { useLocation } from "react-router-dom";

const { Text } = Typography;
const ClassroomView = () => {
  const { academyId } = useSession();
  const location = useLocation();
  const classroomId = location.state?.classroomId;
  const day = location.state?.day;
  const formatedDate = dayjs(day).format("YYYY-MM-DD");
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [isDeleteShiftModalOpen, setDeleteShiftModalOpen] = useState(false);
  const [isPublishedShiftModalOpen, setPublishedShiftModalOpen] =
    useState(false);
  const [classRoomList, setClassRoomList] = useState([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState(classroomId);
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Start from Monday
  const [date, setDate] = useState(formatedDate);
  const [initialDate, setInitialDate] = useState(formatedDate);

  const schoolId = academyId;
  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(schoolId);

  useEffect(() => {
    setClassRoomList(
      classroomData?.data?.filter(
        (classroom) => classroom.status.toLowerCase() === "active"
      )
    );
  }, [classroomData]);

  const handleClassroomChange = (value) => {
    setSelectedClassroomId(value); // Update selected classroom ID
  };

  const handleRangeChange = (newDate) => {
    const formattedStartDate = dayjs(newDate).format("YYYY-MM-DD");
    setInitialDate(formattedStartDate);

    setDate(formattedStartDate);
  };

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };
  const handlePublish = async (id) => {};

  // Define menu items with onClick handlers
  const publishItems = [
    {
      key: "1",
      label: (
        <div onClick={() => setPublishedShiftModalOpen(true)}>Next Month</div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => setPublishedShiftModalOpen(true)}>All Shifts</div>
      ),
    },
  ];
  // const classRoomList = [
  //   { id: 1, name: "1-Blue-D" },
  //   { id: 2, name: "Pink-Rose" },
  //   { id: 3, name: "R-Red" },
  // ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex gap-3">
          <SingleDatePicker
            onDateChange={handleRangeChange}
            gap={10}
            initialDate={initialDate}
          />
          <Select
            className="select-student-add-from"
            placeholder="Select Classroom"
            onChange={handleClassroomChange} // Handle classroom change
            value={selectedClassroomId} // Bind selected value
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
            className="schedule-add-shift-btn d-flex align-items-center justify-content-center"
          >
            <span className="gradient-text d-flex align-items-center">
              <Avatar
                size={14}
                src={"/wow_icons/png/add.png"}
                className="mr8"
              />
              Add Shift
            </span>
          </Button>
          <ButtonComponent
            onClick={() => setPublishedShiftModalOpen(true)}
            text={"Publish"}
          />
        </div>
      </div>
      {/* <OverviewTable /> */}
      <ScheduleView classroomId={selectedClassroomId} date={date} />

      {isAddShiftModalOpen && (
        <ShiftForm
          cardTitle={"Add Shift"}
          classroomId={null}
          setCloseModal={setAddShiftModalOpen}
        />
      )}

      {isPublishedShiftModalOpen && (
        <CommonModalComponent
          open={isPublishedShiftModalOpen}
          setOpen={setPublishedShiftModalOpen}
          modalWidthSize={418}
          modalHeightSize={300}
          isClosable={true}
        >
          <PublishShift
            setCancel={setPublishedShiftModalOpen}
            deleteData={selectedRecord}
            CardTitle="Publish Shifts"
            handlePublish={handlePublish}
            type="school"
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default ClassroomView;
