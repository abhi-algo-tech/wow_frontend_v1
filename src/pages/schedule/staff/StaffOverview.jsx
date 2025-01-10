import { Avatar, Button, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import WeekDatePicker from "../../../components/datepicker/WeekDatePicker";
import OverviewTable from "../OverviewTable";
import CommonModalComponent from "../../../components/CommonModalComponent";
import PublishShift from "../PublishShift";
import ShiftForm from "../ShiftForm";
import ButtonComponent from "../../../components/ButtonComponent";
import { useGetAllStaff } from "../../../hooks/useStaff";
import { useGetAllSchedulesByStaff } from "../../../hooks/useSchedule";
import StaffAttandanceTable from "./StaffAttandanceTable";
import CopyShiftForm from "../CopyShiftForm";
import CopyShiftShiftForm from "../CopyStaffShiftForm";
import { getInitialsTitleWithColor } from "../../../services/common";

const { Text } = Typography;
const convertToHHMM = (hours) => {
  const h = Math.floor(hours); // Get whole hours
  const m = Math.round((hours - h) * 60); // Convert the fractional part to minutes
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`; // Format as hh:mm
};

const StaffOverview = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [initialDate, setInitialDate] = useState({});
  const [isCopyShiftModalOpen, setCopyShiftModalOpen] = useState(false);
  const [scheduleParams, setScheduleParams] = useState(null); // Start with null
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);
  const [isPublishedShiftModalOpen, setPublishedShiftModalOpen] =
    useState(false);
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Start from Monday

  const { data: staffData } = useGetAllStaff();
  // const payload = { ...initialDate, staffId };
  const { data: scheduleData } = useGetAllSchedulesByStaff(scheduleParams, {
    enabled: !!scheduleParams, // Only run when scheduleParams is not null
  });

  const handleRangeChange = (start) => {
    setStartDate(start);
  };

  const staffList = staffData?.data?.map((staff) => ({
    key: String(staff.id),
    label: `${staff.firstName} ${staff.lastName}`,
  }));

  useEffect(() => {
    if (selectedRecord) {
      setScheduleParams({
        staffId: selectedRecord,
        startDate: initialDate?.startDate,
        endDate: initialDate?.endDate,
      });
    }
  }, [initialDate]);

  const handleStaffChange = (id) => {
    setSelectedRecord(id);
    const newStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const endDate = dayjs(startDate).add(5, "days").format("YYYY-MM-DD");
    // Update scheduleParams to trigger the hook
    setScheduleParams({ staffId: id, startDate: newStartDate, endDate });
  };

  const handlePublish = async (id) => {
    // Placeholder for publish logic
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex gap-3">
          <WeekDatePicker
            onRangeChange={handleRangeChange}
            setInitialDate={setInitialDate}
          />

          <Select
            className="select-student-add-from"
            placeholder="Select Staff"
            style={{ width: 185 }}
            onChange={handleStaffChange}
          >
            {staffList?.map((staff) => (
              <Select.Option key={staff.key} value={staff.key}>
                {staff.label}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="d-flex align-items-center gap-3">
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
              <Avatar size={14} src="/wow_icons/png/add.png" className="mr8" />
              Add Shift
            </span>
          </Button>
          <ButtonComponent
            onClick={() => setPublishedShiftModalOpen(true)}
            text="Publish"
          />
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
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              {/* <Avatar size={88} src="/wow_images/staff.png" /> */}
              <Avatar
                src={scheduleData?.data?.[0].profileUrl || null} // Use avatar if available
                size={88}
                style={{
                  backgroundColor: !scheduleData?.data?.[0].profileUrl
                    ? getInitialsTitleWithColor(
                        scheduleData?.data?.[0].staffName
                      ).backgroundColor
                    : "transparent", // Set background color if no avatar
                }}
              >
                {!scheduleData?.data?.[0].profileUrl &&
                  getInitialsTitleWithColor(scheduleData?.data?.[0].staffName)
                    .initials}
              </Avatar>
              {scheduleData?.data?.[0]?.status?.toLowerCase() === "active" && (
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
              )}
            </div>

            <div className="d-flex flex-column gap-2">
              <div className="label-20-500">
                {scheduleData?.data?.[0].staffName}
              </div>
              <div className="label-12-400">
                {scheduleData?.data?.[0].designation}
              </div>
              <div className="label-12-400">
                {scheduleData?.data?.[0].primaryClassroom}
              </div>
            </div>
          </div>

          <div className="d-flex gap-3">
            {["Available Hours", "Scheduled Hours", "Unscheduled Hours"].map(
              (label, index) => {
                const backgrounds = ["#FFFAEA", "#EAFFFA", "#FFFFFF"];
                const availableHours =
                  scheduleData?.data?.[0]?.availableHours || 0;
                const scheduledHours =
                  scheduleData?.data?.[0]?.scheduledHours || 0;

                const availableHoursFormatted = convertToHHMM(availableHours);
                const scheduledHoursFormatted = convertToHHMM(scheduledHours);
                const unscheduledHoursFormatted = convertToHHMM(
                  availableHours - scheduledHours
                );

                const values = [
                  availableHoursFormatted,
                  scheduledHoursFormatted,
                  unscheduledHoursFormatted,
                ];
                const icons = [
                  "/wow_icons/png/history_toggle_off.png",
                  "/wow_icons/png/more_time.png",
                  "/wow_icons/png/unschedule.png",
                ];

                return (
                  <div
                    key={index}
                    className="d-flex"
                    style={{
                      width: "256px",
                      height: "88px",
                      background: backgrounds[index],
                      border: "1px solid rgba(22, 40, 49, 0.1)",
                      borderRadius: "12px",
                      padding: "12px 19px",
                    }}
                  >
                    <div className="me-3">
                      <img src={icons[index]} className="size-36" />
                    </div>

                    <div>
                      <p className="label-16-500 mb1">{label}</p>
                      <p className="label-32-600 mb-0">{values[index]}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* <OverviewTable /> */}
      {/* <OverviewTable1 /> */}
      {initialDate?.startDate &&
        scheduleData?.data?.[0]?.schedules.length > 0 && (
          <StaffAttandanceTable
            schedules={scheduleData?.data?.[0]?.schedules}
            startDate={initialDate?.startDate}
          />
        )}
      {isAddShiftModalOpen && (
        <ShiftForm
          cardTitle="Add Shift"
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
          isClosable
        >
          <PublishShift
            setCancel={setPublishedShiftModalOpen}
            deleteData={selectedRecord}
            CardTitle="Publish Shifts"
            handlePublish={handlePublish}
            type="staff"
          />
        </CommonModalComponent>
      )}
      {isCopyShiftModalOpen && (
        <CommonModalComponent
          open={isCopyShiftModalOpen}
          setOpen={setCopyShiftModalOpen}
          modalWidthSize={500}
          isClosable={true}
        >
          <CopyShiftShiftForm
            cardTitle={"Copy Staff Shifts"}
            closeModal={() => setCopyShiftModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StaffOverview;
