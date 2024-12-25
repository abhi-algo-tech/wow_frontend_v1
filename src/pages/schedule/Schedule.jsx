import { Avatar, Button, Divider, Dropdown, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CommonModalComponent from "../../components/CommonModalComponent";
import ScheduleTable from "./ScheduleTable";
import ShiftForm from "./ShiftForm";
import dayjs from "dayjs";
import CopyShiftForm from "./CopyShiftForm";
import WeekDatePicker from "../../components/datepicker/WeekDatePicker";
import PublishShift from "./PublishShift";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useSession } from "../../hooks/useSession";
import ButtonComponent from "../../components/ButtonComponent";

const { Text } = Typography;
const Schedule = () => {
  const { academyId } = useSession();
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);
  const [isCopyShiftModalOpen, setCopyShiftModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteShiftModalOpen, setDeleteShiftModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [isPublishedShiftModalOpen, setPublishedShiftModalOpen] =
    useState(false);
  const [classRoomList, setClassRoomList] = useState([]);
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Start from Monday
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
  const handleRangeChange = (start, end) => {
    setStartDate(start);
  };

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };
  const handleDelete = async (id) => {};

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

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <WeekDatePicker onRangeChange={handleRangeChange} gap={10} />
        <div className="d-flex  align-items-center gap-3">
          <Button
            size="small"
            className="schedule-copy-btn border-none"
            onClick={() => setCopyShiftModalOpen(true)}
          >
            <img
              style={{ width: 17, height: 20 }}
              src="/wow_icons/png/content_copy.png"
            />{" "}
            <span className="label-12-400"> Copy shifts </span>
          </Button>
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
      <ScheduleTable startDate={startDate} classRoomList={classRoomList} />

      {isAddShiftModalOpen && (
        <ShiftForm
          cardTitle={"Add Shift"}
          classroomId={null}
          setCloseModal={setAddShiftModalOpen}
        />
      )}
      {isCopyShiftModalOpen && (
        <CommonModalComponent
          open={isCopyShiftModalOpen}
          setOpen={setCopyShiftModalOpen}
          modalWidthSize={500}
          isClosable={true}
        >
          <CopyShiftForm
            cardTitle={"Copy Shifts"}
            classroomId={null}
            closeModal={() => setCopyShiftModalOpen(false)}
          />
        </CommonModalComponent>
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
            handleDelete={handleDelete}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default Schedule;
