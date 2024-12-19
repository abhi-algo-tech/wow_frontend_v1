import { Form, Select, TimePicker, Input, Checkbox, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import CustomDatePicker from "../../components/CustomDatePicker";
import { GoPlus } from "react-icons/go";
import ButtonComponent from "../../components/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import YesNoRadio from "../../components/radio/YesNoRadio";

export default function ShiftForm({ cardTitle, shiftId, setCloseModal }) {
  const [form] = Form.useForm();
  const [allDaysSelected, setAllDaysSelected] = useState(false);
  const [checkedDays, setCheckedDays] = useState([]);
  const [firstModal, setFirstModal] = useState(true);
  const [nextModal, setNextModal] = useState(false);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const handleSelectAll = () => {
    const newValue = !allDaysSelected;
    setAllDaysSelected(newValue);

    const selectedDays = newValue ? weekDays : [];
    setCheckedDays(selectedDays);
    form.setFieldsValue({ repeatOn: selectedDays });
  };

  const onChange = (checkedValues) => {
    setCheckedDays(checkedValues);
    setAllDaysSelected(checkedValues.length === weekDays.length);
  };
  const handleCancelClick = () => {
    setCloseModal(false);
  };
  const onFinish = (values) => {
    onConfirm({
      ...values,
      shiftStart: values.shiftStart.format("HH:mm A"),
      shiftEnd: values.shiftEnd.format("HH:mm A"),
      breakStart: values.breakStart.format("HH:mm A"),
      breakEnd: values.breakEnd.format("HH:mm A"),
    });
    setCloseModal(false);
  };

  const handleNext = () => {
    setFirstModal(false);
    setNextModal(true);
  };

  const handleBack = () => {
    setNextModal(false);
    setFirstModal(true);
  };
  return (
    <>
      <CommonModalComponent
        open={firstModal}
        setOpen={setFirstModal}
        modalWidthSize={796}
        modalHeightSize={544}
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
            {cardTitle}
          </span>
          <Form
            form={form}
            layout="vertical"
            className="addshift-form"
            onFinish={onFinish}
            initialValues={{
              date: dayjs("2024-12-14"),
              shiftStart: dayjs("07:00", "HH:mm"),
              shiftEnd: dayjs("17:30", "HH:mm"),
              breakStart: dayjs("13:00", "HH:mm"),
              breakEnd: dayjs("13:30", "HH:mm"),
              untilDate: dayjs("2024-12-31"),
            }}
            style={{ padding: "26px 46px" }}
          >
            <div>
              <div className="row mb10">
                <div className="col-md-4">
                  <Form.Item
                    label={
                      <span className="d-flex label-12-400">
                        Date<span className="text-danger">*</span>
                      </span>
                    }
                    name="shiftdate"
                    className="mb0"
                  >
                    <CustomDatePicker
                      name="shiftdate"
                      rules={[
                        {
                          required: true,
                          message: "Please select the Date",
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <div className=" label-12-400 mb12">
                    Staff
                    <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="staff"
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
                    >
                      <Option value="1">Andrew</Option>
                      <Option value="2">Jhon</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <div className=" label-12-400 mb12">
                    Room
                    <span className="text-danger"> *</span>
                  </div>
                  <Form.Item
                    name="room"
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
                      options={[
                        { value: "1-blue-d", label: "1-Blue D" },
                        { value: "2-green-d", label: "2-Green D" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="row mb10">
                <div className="col-md-3">
                  <div className=" label-12-400 mb12">
                    Shift Start
                    <span className="text-danger"> *</span>
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
                      onKeyDown={(e) => {
                        const regex = /^[0-9:APMapm\b]+$/; // Allow numbers, colon, A, P, M, a, p, and backspace
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <div className=" label-12-400 mb12">
                    Shift End
                    <span className="text-danger"> *</span>
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
                      onKeyDown={(e) => {
                        const regex = /^[0-9:APMapm\b]+$/; // Allow numbers, colon, A, P, M, a, p, and backspace
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="col-md-3">
                  <div className=" label-12-400 mb12">
                    Break Start
                    <span className="text-danger"> *</span>
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
                      onKeyDown={(e) => {
                        const regex = /^[0-9:APMapm\b]+$/; // Allow numbers, colon, A, P, M, a, p, and backspace
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="col-md-3">
                  <div className=" label-12-400 mb12">
                    Break End
                    <span className="text-danger"> *</span>
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
                      onKeyDown={(e) => {
                        const regex = /^[0-9:APMapm\b]+$/; // Allow numbers, colon, A, P, M, a, p, and backspace
                        if (!regex.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
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
                <Form.Item name="repeatOn" initialValue={[]}>
                  <Checkbox.Group onChange={onChange}>
                    <div className="d-flex gap-3">
                      {weekDays.map((day) => (
                        <Checkbox
                          key={day}
                          value={day}
                          className={`week-day-checkbox ${
                            checkedDays.includes(day) ? "opacity1" : "opacity05"
                          }`}
                        >
                          <div className=" rounded-full ml10 transition-colors">
                            <span
                              className={`shift-week-day ${
                                checkedDays.includes(day)
                                  ? "text-blue"
                                  : "text-gray"
                              }`}
                            >
                              {day}
                            </span>
                          </div>
                        </Checkbox>
                      ))}
                    </div>
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <div className="row mb10 ">
                <div className="col-md-4">
                  <Form.Item
                    label={
                      <span className="d-flex label-12-400">
                        Until Date<span className="text-danger">*</span>
                      </span>
                    }
                    name="untildate"
                  >
                    <CustomDatePicker
                      name="untildate"
                      rules={[
                        {
                          required: true,
                          message: "Please select the Until Date",
                        },
                      ]}
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
              </div>

              <div className="text-center mt20">
                <ButtonComponent
                  text="Cancel"
                  gradient={false}
                  padding={"14px 45px"}
                  margin="0 16px 0 0"
                  onClick={handleCancelClick}
                />

                <ButtonComponent
                  text={"Next"}
                  padding="14px 45px"
                  onClick={handleNext}
                />
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
            onFinish={onFinish}
            style={{ padding: "24px 40px" }}
          >
            <div className="">
              <div className="row gap10">
                <div className="label-16-600">Make the edit to</div>
                <div className="my-4">
                  <YesNoRadio
                    options={[
                      { label: "This Shift", value: "This Shift" },
                      {
                        label: "This Shift& All future units",
                        value: "This Shift& All future units",
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
    </>
  );
}
