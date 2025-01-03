import {
  Form,
  Select,
  TimePicker,
  Input,
  Checkbox,
  Button,
  Tooltip,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomDatePicker from "../../components/CustomDatePicker";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import YesNoRadio from "../../components/radio/YesNoRadio";
import { useGetAllStaff } from "../../hooks/useStaff";
import { useSession } from "../../hooks/useSession";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import {
  useCreateShift,
  useWeekScheduleByStaffId,
} from "../../hooks/useWeekSchedule";
import { CustomMessage } from "../../utils/CustomMessage";
import {
  formateTime,
  getDayNameByDate,
  validateTime,
  validateTimeRange,
} from "./scheduleData";
import DeleteSchedulePopUp from "../../components/DeleteSchedulePopup";

export default function ShiftForm({
  cardTitle,
  classroomSelectedData,
  setCloseModal,
  // handleDeleteConfirmModal,
}) {
  const { academyId } = useSession();
  const [form] = Form.useForm();
  const [allDaysSelected, setAllDaysSelected] = useState(false);
  const [checkedDays, setCheckedDays] = useState([]);
  const [firstModal, setFirstModal] = useState(true);
  const [nextModal, setNextModal] = useState(false);
  const [modalType, setModalType] = useState(
    cardTitle?.toLowerCase() === "add shift" ? "add" : "edit"
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState(
    classroomSelectedData?.teacherId || null
  );
  const [classRooms, setClassRooms] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [times, setTimes] = useState({
    shiftStart: null,
    shiftEnd: null,
    breakStart: null,
    breakEnd: null,
  });
  const schoolId = academyId;
  const { data: staffData } = useGetAllStaff();
  const { data: classroomData } = useGetClassroomsBySchool(schoolId);
  const { data: staffWeekScheduleData } =
    useWeekScheduleByStaffId(selectedStaffId);
  const createShiftMutation = useCreateShift();
  const handleStaffChange = (value) => {
    setSelectedStaffId(value); // Update state with the selected staff ID
    form.setFieldsValue({ staff: value }); // Set the value in the form
  };

  useEffect(() => {
    if (classroomData) {
      const activeClassrooms = classroomData?.data?.filter(
        (classroom) => classroom.status.toLowerCase() === "active"
      );
      setClassRooms(activeClassrooms || []);
    }
  }, [classroomData]);

  useEffect(() => {
    if (staffData) {
      const activeStaffs = staffData?.data?.filter(
        (staff) => staff.status.toLowerCase() === "active"
      );
      setStaffs(activeStaffs || []);
    }
  }, [staffData]);

  const weekDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  // Get the current day of the week
  const currentDay = dayjs().format("dddd").toUpperCase();
  // Determine the selected day
  const selectedDay =
    selectedDate !== undefined && selectedDate !== null
      ? getDayNameByDate(selectedDate)
      : classroomSelectedData?.date
      ? getDayNameByDate(classroomSelectedData?.date)
      : "false";

  useEffect(() => {
    // Find the matching object
    const matchedSchedule = staffWeekScheduleData?.data?.find((schedule) => {
      const dayToCompare = selectedDay || currentDay;
      return schedule?.dayOfWeek.toLowerCase() === dayToCompare.toLowerCase();
    });

    setCurrentSchedule(matchedSchedule);
  }, [selectedDay, staffWeekScheduleData?.data]);

  useEffect(() => {
    if (modalType === "add") {
      if (currentSchedule) {
        form.setFieldsValue({
          shiftStart: dayjs(currentSchedule?.startTime, "HH:mm"),
          shiftEnd: dayjs(currentSchedule?.endTime, "HH:mm"),
          breakStart: dayjs(currentSchedule?.breakStartTime, "HH:mm"),
          breakEnd: dayjs(currentSchedule?.breakEndTime, "HH:mm"),
          untilDate:
            checkedDays.length > 0
              ? dayjs().add(1, "month").format("YYYY-MM-DD")
              : null,
        });
        setTimes({
          shiftStart: currentSchedule?.startTime,
          shiftEnd: currentSchedule?.endTime,
          breakStart: currentSchedule?.breakStartTime,
          breakEnd: currentSchedule?.breakEndTime,
        });
      } else {
        form.setFieldsValue({
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
        });
      }
    }
  }, [currentSchedule, checkedDays, form]);

  useEffect(() => {
    if (classroomSelectedData) {
      form.setFieldsValue({
        shiftdate: classroomSelectedData?.date,
        shiftStart: dayjs(classroomSelectedData?.startTime, "HH:mm:ss"),
        shiftEnd: dayjs(classroomSelectedData?.endTime, "HH:mm"),
        breakStart: dayjs(classroomSelectedData?.breakStartTime, "HH:mm"),
        breakEnd: dayjs(classroomSelectedData?.breakEndTime, "HH:mm"),
        staffId: Number(classroomSelectedData?.teacherId),
        classroomId: Number(classroomSelectedData?.classRoomId),
        untilDate:
          modalType === "edit"
            ? classroomSelectedData?.date
            : dayjs(classroomSelectedData?.date)
                .add(1, "month")
                .format("YYYY-MM-DD"),
      });
      setTimes({
        shiftStart: classroomSelectedData?.startTime,
        shiftEnd: classroomSelectedData?.endTime,
        breakStart: classroomSelectedData?.breakStartTime,
        breakEnd: classroomSelectedData?.breakEndTime,
      });
    }
  }, [classroomSelectedData, form]);

  const handleSelectAll = () => {
    const newValue = !allDaysSelected;
    setAllDaysSelected(newValue);

    const selectedDays = newValue ? weekDays : [];
    setCheckedDays(selectedDays);
    form.setFieldsValue({ repeatDays: selectedDays });
  };

  const handleTimeChange = (field, value) => {
    const formattedTime = value ? value.format("HH:mm") : null;
    setTimes((prevTimes) => ({
      ...prevTimes,
      [field]: formattedTime,
    }));

    if (field === "breakStart" || field === "breakEnd") {
      const { shiftStart, shiftEnd } = {
        ...times,
        [field]: formattedTime, // Include the current change
      };

      if (shiftStart && shiftEnd) {
        const breakTime = dayjs(value, "HH:mm");
        const start = dayjs(shiftStart, "HH:mm");
        const end = dayjs(shiftEnd, "HH:mm");

        if (!breakTime.isBetween(start, end, null, "[]")) {
          message.error(
            `${
              field === "breakStart" ? "Break Start" : "Break End"
            } time must be within the Shift Start and Shift End times`
          );
          form.setFieldsValue({ [field]: null });
          setTimes((prevTimes) => ({
            ...prevTimes,
            [field]: null,
          }));
        }
      }
    }
  };

  const onChange = (checkedValues) => {
    setCheckedDays(checkedValues);
    setAllDaysSelected(checkedValues.length === weekDays.length);
  };
  const handleCancelClick = () => {
    setCloseModal(false);
  };
  const handleDeleteBtnConfirmModal = () => {
    const formValues = form.getFieldsValue();
    // console.log("Form Values on Delete:", formValues);
    setSelectedRecord(formValues);
    setDeleteModalOpen(true);
  };
  const handleSubmit = (values) => {
    const {
      shiftdate,
      shiftStart,
      shiftEnd,
      breakStart,
      breakEnd,
      classroomId,
      staffId,
      note,
      repeatDays,
      untilDate,
    } = values;

    const shiftData = {
      startShift: shiftStart.format("HH:mm:ss"),
      endShift: shiftEnd.format("HH:mm:ss"),
      breakShift: breakStart.format("HH:mm:ss"),
      breakEndShift: breakEnd.format("HH:mm:ss"),
      schoolId: Number(schoolId),
      classroomId,
      staffId,
      note,
    };

    createShiftMutation.mutate(
      {
        params: {
          startDate: shiftdate ? dayjs(shiftdate).format("YYYY-MM-DD") : null,
          untilDate: untilDate
            ? dayjs(untilDate).format("YYYY-MM-DD")
            : dayjs(shiftdate).format("YYYY-MM-DD"),
          repeatDays:
            repeatDays.length > 0
              ? repeatDays
              : getDayNameByDate(shiftdate).toUpperCase(),
        },
        shiftData: shiftData,
      },
      {
        onSuccess: () => {
          CustomMessage.success("Published shift successfully!");
          setCloseModal(false);
        },
        onError: (error) => {
          CustomMessage.error(`Failed to Publish shift: ${error.message}`);
        },
      }
    );
  };

  const handleNext = () => {
    setFirstModal(false);
    setNextModal(true);
  };

  const handleBack = () => {
    setNextModal(false);
    setFirstModal(true);
  };
  const handleDelete = async () => {
    // console.log("selectedRecord", selectedRecord);

    const shiftData = {
      startShift: dayjs(selectedRecord?.shiftdate).format("HH:mm:ss"),
      endShift: dayjs(selectedRecord?.shiftEnd).format("HH:mm:ss"),
      breakShift: dayjs(selectedRecord?.breakStart).format("HH:mm:ss"),
      breakEndShift: dayjs(selectedRecord?.breakEnd).format("HH:mm:ss"),
      schoolId,
      classroomId: Number(selectedRecord?.classroomId),
      staffId: Number(selectedRecord?.staffId),
      note: selectedRecord?.note || "",
      isDeleted: true,
    };
    createShiftMutation.mutate(
      {
        params: {
          startDate: selectedRecord?.shiftdate
            ? dayjs(selectedRecord?.shiftdate).format("YYYY-MM-DD")
            : null,
          untilDate: selectedRecord?.untilDate
            ? dayjs(selectedRecord?.untilDate).format("YYYY-MM-DD")
            : null,
          repeatDays:
            selectedRecord?.repeatDays.lenght > 0
              ? selectedRecord?.repeatDays
              : getDayNameByDate(selectedRecord?.shiftdate).toUpperCase(),
        },
        shiftData: shiftData,
      },
      {
        onSuccess: () => {
          CustomMessage.success("Published shift deleted successfully!");
          setCloseModal(false);
        },
        onError: (error) => {
          CustomMessage.error(`Failed to delete shift: ${error.message}`);
        },
      }
    );
  };
  return (
    <>
      <CommonModalComponent
        open={firstModal}
        setOpen={setFirstModal}
        modalWidthSize={796}
        modalHeightSize={544}
        // isClosable={true}
        onClick={() => setCloseModal(false)}
      >
        <div className="card">
          <span
            style={{
              backgroundColor: "#eef1fe",
              padding: 15,
              borderRadius: "8px 8px 0 0",
            }}
            className="label-16-600"
          >
            {cardTitle}
          </span>
          <Form
            form={form}
            layout="vertical"
            className="addshift-form"
            onFinish={handleSubmit}
            initialValues={{
              shiftdate: dayjs(),
            }}
            style={{ padding: "26px 46px" }}
          >
            <div>
              <div className="row mb10">
                <div className="col-md-4">
                  <div className=" label-12-400 mb12">
                    Date
                    <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="shiftdate"
                    rules={[
                      {
                        required: true,
                        message: "Please select the Date",
                      },
                    ]}
                    className="mb0"
                  >
                    <CustomDatePicker
                      value={selectedDate}
                      onChange={setSelectedDate}
                      isDisabledBackDate={true}
                      // autoSelectToday={true}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <div className=" label-12-400 mb12">
                    Staff
                    <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="staffId"
                    rules={[
                      {
                        required: true,
                        message: "Please select the Staff!",
                      },
                    ]}
                  >
                    <Select
                      className="select-student-add-from"
                      placeholder="Select Staff"
                      value={form?.staff}
                      onChange={handleStaffChange}
                      options={staffs?.map((classroom) => ({
                        value: classroom?.id,
                        label: `${classroom?.firstName} ${classroom?.lastName}`,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <div className=" label-12-400 mb12">
                    Room
                    <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="classroomId"
                    rules={[
                      {
                        required: true,
                        message: "Please select the Room!",
                      },
                    ]}
                  >
                    <Select
                      className="select-student-add-from"
                      placeholder="Select Room"
                      options={classRooms?.map((classroom) => ({
                        value: classroom?.id,
                        label: classroom?.name,
                      }))}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row mb10">
                {/* Shift Start */}
                <div className="col-md-3">
                  <div className="label-12-400 mb12">
                    Shift Start <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="shiftStart"
                    rules={[
                      {
                        required: true,
                        message: "Please select shift start time",
                      },
                    ]}
                  >
                    <TimePicker
                      format="hh:mm A"
                      className="form-control time-picker border-none"
                      onChange={(value) =>
                        handleTimeChange("shiftStart", value)
                      }
                    />
                  </Form.Item>
                </div>

                {/* Shift End */}
                <div className="col-md-3">
                  <div className="label-12-400 mb12">
                    Shift End <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="shiftEnd"
                    rules={[
                      {
                        required: true,
                        message: "Please select shift end time",
                      },
                    ]}
                  >
                    <TimePicker
                      format="hh:mm A"
                      className="form-control time-picker border-none"
                      onChange={(value) => handleTimeChange("shiftEnd", value)}
                    />
                  </Form.Item>
                </div>

                {/* Break Start */}
                <div className="col-md-3">
                  <div className="label-12-400 mb12">
                    Break Start <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="breakStart"
                    rules={[
                      {
                        required: true,
                        message: "Please select break start time",
                      },
                    ]}
                  >
                    <TimePicker
                      format="hh:mm A"
                      className="form-control time-picker border-none"
                      onChange={(value) =>
                        handleTimeChange("breakStart", value)
                      }
                    />
                  </Form.Item>
                </div>

                {/* Break End */}
                <div className="col-md-3">
                  <div className="label-12-400 mb12">
                    Break End <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="breakEnd"
                    rules={[
                      {
                        required: true,
                        message: "Please select break end time",
                      },
                    ]}
                  >
                    <TimePicker
                      format="hh:mm A"
                      className="form-control time-picker border-none"
                      onChange={(value) => handleTimeChange("breakEnd", value)}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row mb10">
                <div className="d-flex align-items-center">
                  <span className="label-12-400">Repeat On</span>
                  <Button
                    type="link"
                    onClick={handleSelectAll}
                    className="p-0 text-decoration-none ms-2"
                  >
                    {allDaysSelected ? "Deselect All" : "Select All"}
                  </Button>
                </div>
                <Form.Item name="repeatDays" initialValue={[]}>
                  <Checkbox.Group onChange={onChange}>
                    <div className="d-flex gap-3">
                      {staffWeekScheduleData?.data.map((day) => {
                        const isDisabled = day?.startTime === "00:00:00";
                        // debugger;

                        const isTimeRangeValid = validateTimeRange(
                          `"${day?.startTime}"`,
                          `"${day?.endTime}"`,
                          `"${times?.shiftStart}"`,
                          `"${times?.shiftEnd}"`
                        );

                        const tooltipContent = isDisabled
                          ? "No Schedule "
                          : `Start: ${formateTime(
                              day?.startTime
                            )}, End: ${formateTime(day?.endTime)}`;

                        return (
                          <Checkbox
                            value={day?.dayOfWeek}
                            className={`week-day-checkbox ${
                              checkedDays.includes(day?.dayOfWeek)
                                ? "opacity1"
                                : "opacity05"
                            }`}
                            disabled={isDisabled || !isTimeRangeValid}
                          >
                            <Tooltip
                              key={day?.dayOfWeek}
                              title={tooltipContent}
                              placement="top"
                              overlayStyle={{
                                whiteSpace: "nowrap",
                                maxWidth: "none",
                              }} // Ensure full content is visible
                              mouseEnterDelay={0.3}
                            >
                              <div className="rounded-full ml10 transition-colors">
                                <span
                                  className={`shift-week-day ${
                                    checkedDays.includes(day?.dayOfWeek)
                                      ? "text-blue"
                                      : "text-gray"
                                  }`}
                                >
                                  {day?.dayOfWeek}
                                </span>
                              </div>
                            </Tooltip>
                          </Checkbox>
                        );
                      })}
                    </div>
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <div className="row mb10 d-flex align-items-center">
                <div className="col-md-4">
                  <div className=" label-12-400 mb12">
                    Until Date
                    {checkedDays.length === 0 ? (
                      ""
                    ) : (
                      <span className="text-danger">*</span>
                    )}
                  </div>

                  <Form.Item
                    rules={[
                      {
                        required: checkedDays.length > 0,
                        message: "Please select the Until Date",
                      },
                    ]}
                    name="untilDate"
                  >
                    <CustomDatePicker
                      disabled={checkedDays.length === 0}
                      isDisabledBackDate={true}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <div className=" label-12-400 mb12">Add Note</div>
                  <Form.Item name="note">
                    <div className="position-relative ">
                      <Input
                        placeholder="Eg. Please note the change in classroom location "
                        className=" shift-add-note border-none"
                        rows={1}
                      />
                    </div>
                  </Form.Item>
                </div>
                {modalType === "edit" && (
                  <div className="col-md-2 ">
                    <button
                      onClick={handleDeleteBtnConfirmModal}
                      // onClick={() => handleDeleteConfirmModal(1, "chandan")}
                      className={`btn d-flex align-items-center justify-content-center rounded-circle p-0 `}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#FF3B30",
                      }}
                      aria-label="Delete"
                      type="button"
                    >
                      <img
                        src={"/wow_icons/png/delete.png"}
                        className="h-50 w-50"
                      />
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center mt20">
                <ButtonComponent
                  text="Cancel"
                  gradient={false}
                  padding={"14px 45px"}
                  margin="0 16px 0 0"
                  onClick={handleCancelClick}
                />
                {/* {modalType === "add" ? ( */}
                <ButtonComponent
                  text={"Confirm"}
                  padding="14px 45px"
                  type="submit"
                />
                {/* ) : (
                  <ButtonComponent
                    text={"Next"}
                    padding="14px 45px"
                    onClick={handleNext}
                    type="button"
                  />
                )} */}
              </div>
            </div>
          </Form>
        </div>
      </CommonModalComponent>
      <CommonModalComponent
        open={nextModal}
        setOpen={setNextModal}
        modalWidthSize={418}
        modalHeightSize={249}
        isClosable={true}
        onClick={() => setCloseModal(false)}
      >
        <div className="card">
          <span
            style={{
              backgroundColor: "#eef1fe",
              padding: 15,
              borderRadius: "8px 8px 0 0",
            }}
            className="label-16-600"
          >
            Edit Shift
          </span>
          <Form
            form={form}
            layout="vertical"
            className="addshift-form"
            onFinish={handleSubmit}
            style={{ padding: "24px 40px" }}
          >
            <div className="">
              <div className="row gap10">
                <div className="label-16-600">Make the edit to</div>
                <div className="my-4">
                  <YesNoRadio
                    options={[
                      { label: "This Shift", value: "classroom" },
                      {
                        label: "This Shift & All future shifts",
                        value: "This Shift & All future shifts",
                      },
                    ]}
                    defaultValue="classroom"
                    style={{ display: "grid" }}
                    mb={20}
                  />
                </div>

                {/* <Radio.Group className="space-y-2">
                  <Radio value="this">This UNIT</Radio>
                  <Radio value="all">This UNIT & All future units</Radio>
                </Radio.Group> */}
              </div>

              <div className="d-flex text-center ">
                <ButtonComponent
                  text={"Go Back"}
                  padding="14px 45px"
                  gradient={false}
                  onClick={handleBack}
                />
                <ButtonComponent
                  text={"Confirm"}
                  padding="14px 45px"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        </div>
      </CommonModalComponent>
      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={560}
          isClosable={true}
        >
          <DeleteSchedulePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            // CardTitle="Delete Classroom"
            handleDelete={handleDelete}
            module="Selected Shift"
          />
        </CommonModalComponent>
      )}
    </>
  );
}
