// import { Form, Select, TimePicker, Input, Checkbox, Button } from "antd";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import CustomDatePicker from "../../components/CustomDatePicker";
// import ButtonComponent from "../../components/ButtonComponent";
// import YesNoRadio from "../../components/radio/YesNoRadio";
// import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";
// import WeekDatePicker from "../../components/datepicker/WeekDatePicker";
// import { useSession } from "../../hooks/useSession";
// import { useGetClassroomsBySchool } from "../../hooks/useClassroom";

// export default function CopyShiftForm({ cardTitle, shiftId, closeModal }) {
//   const { academyId } = useSession();
//   const [form] = Form.useForm();
//   const [selectedClassroom, setSelectedClassroom] = useState([]);
//   const [classRoomList, setClassRoomList] = useState([]);
//   const [startDate, setStartDate] = useState(
//     dayjs().startOf("week").add(1, "day")
//   ); // Start from Monday

//   const schoolId = academyId;
//   const {
//     data: classroomData,
//     isLoading,
//     isError,
//     error,
//   } = useGetClassroomsBySchool(schoolId);

//   useEffect(() => {
//     setClassRoomList(
//       classroomData?.data?.filter(
//         (classroom) => classroom.status.toLowerCase() === "active"
//       )
//     );
//   }, [classroomData]);

//   const handleRangeChange = (start, end) => {
//     setStartDate(start);
//   };

//   const handleClassroomChange = (value) => {
//     setSelectedClassroom(value);
//   };

//   const onFinish = (values) => {
//     closeModal();
//   };

//   return (
//     <div className="card">
//       <span
//         style={{
//           backgroundColor: "#eef1fe",
//           fontWeight: "bold",
//           padding: 15,
//           borderRadius: "8px 8px 0 0",
//         }}
//       >
//         {cardTitle}
//       </span>
//       <Form
//         form={form}
//         layout="vertical"
//         className="addshift-form"
//         onFinish={onFinish}
//         style={{ padding: "20px 40px" }}
//       >
//         <div className="row ">
//           <div className="col-md-4">
//             <Form.Item
//               label={
//                 <span className="d-flex label-12-400">
//                   Copy shifts by<span className="text-danger">*</span>
//                 </span>
//               }
//               name="copyShiftBy"
//               className="mb0"
//             >
//               <YesNoRadio
//                 options={[
//                   { label: "Classroom", value: "classroom" },
//                   { label: "Staff", value: "staff" },
//                 ]}
//                 defaultValue="classroom"
//                 style={{ display: "flex" }}
//               />
//             </Form.Item>
//           </div>
//         </div>
//         <div className="col-12">
//           <div className=" items-center gap-1 student-label ">
//             Classrooms<span className="text-danger"> *</span>
//           </div>
//           <Form.Item
//             name="allowedClassroom"
//             rules={[
//               {
//                 required: true,
//                 message: "Please select allowed Classroom",
//               },
//             ]}
//           >
//             <MultiSelectWithTags
//               name="tags"
//               value={selectedClassroom}
//               onChange={handleClassroomChange}
//               options={classRoomList
//                 ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort classrooms by name in ascending order
//                 .map((classroom) => ({
//                   label: classroom.name,
//                   value: classroom.id,
//                 }))}
//               placeholder="Select Classroom"
//             />
//           </Form.Item>
//         </div>

//         <div className="row ">
//           <div className="col-md-5">
//             <div className=" label-12-400 mb12">
//               From week<span className="text-danger">*</span>
//             </div>
//             <Form.Item name="fromWeek">
//               <WeekDatePicker
//                 onRangeChange={handleRangeChange}
//                 showButtons={false}
//                 bgBorder={true}
//                 fontSize={14}
//               />
//             </Form.Item>
//           </div>
//           <div className="col-md-5">
//             <Form.Item
//               label={
//                 <span className="d-flex label-12-400">
//                   Until Date<span className="text-danger">*</span>
//                 </span>
//               }
//               name="untildate"
//             >
//               <CustomDatePicker
//                 name="untildate"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select the Until Date",
//                   },
//                 ]}
//               />
//             </Form.Item>
//           </div>
//         </div>

//         <div className="text-center">
//           <ButtonComponent text={"Confirm"} padding="14px 45px" type="submit" />
//         </div>
//       </Form>
//     </div>
//   );
// }
import { Form, Select, TimePicker, Input, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomDatePicker from "../../components/CustomDatePicker";
import ButtonComponent from "../../components/ButtonComponent";
import YesNoRadio from "../../components/radio/YesNoRadio";
import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";
import WeekDatePicker from "../../components/datepicker/WeekDatePicker";
import { useSession } from "../../hooks/useSession";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useCopyByClassroom } from "../../hooks/useSchedule";

export default function CopyShiftForm({ cardTitle, shiftId, closeModal }) {
  const { academyId } = useSession();
  const [form] = Form.useForm();
  const [selectedClassroom, setSelectedClassroom] = useState([]);
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

  const { mutate: copyByClassroom, isLoading: isCopying } =
    useCopyByClassroom();

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

  const handleClassroomChange = (value) => {
    setSelectedClassroom(value);
  };

  const onFinish = (values) => {
    const { copyShiftBy, allowedClassroom, fromWeek, untildate } = values;

    const newStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const endDate = startDate.add(5, "days");
    const newEndDate = dayjs(endDate).format("YYYY-MM-DD");
    // Call the mutation function
    copyByClassroom(
      {
        classroomIds: allowedClassroom,
        startWeekDate: newStartDate,
        endWeekDate: newEndDate, // Assuming week ends 5 days after start
        untilDate: dayjs(untildate).format("YYYY-MM-DD"),
      },
      {
        onSuccess: () => {
          closeModal();
        },
        onError: (error) => {
          console.error("Failed to copy shifts:", error);
        },
      }
    );
  };

  return (
    <div className="card">
      <span
        style={{
          backgroundColor: "#eef1fe",
          fontWeight: "bold",
          padding: 15,
          borderRadius: "8px 8px 0 0",
        }}
      >
        {cardTitle}
      </span>
      <Form
        form={form}
        layout="vertical"
        className="addshift-form"
        onFinish={onFinish}
        style={{ padding: "20px 40px" }}
      >
        <div className="row ">
          <div className="col-md-4">
            <Form.Item
              label={
                <span className="d-flex label-12-400">
                  Copy shifts by<span className="text-danger">*</span>
                </span>
              }
              name="copyShiftBy"
              className="mb0"
            >
              <YesNoRadio
                options={[
                  { label: "Classroom", value: "classroom" },
                  { label: "Staff", value: "staff" },
                ]}
                defaultValue="classroom"
                style={{ display: "flex" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-12">
          <div className=" items-center gap-1 student-label ">
            Classrooms<span className="text-danger"> *</span>
          </div>
          <Form.Item
            name="allowedClassroom"
            rules={[
              {
                required: true,
                message: "Please select allowed Classroom",
              },
            ]}
          >
            <MultiSelectWithTags
              name="tags"
              value={selectedClassroom}
              onChange={handleClassroomChange}
              options={classRoomList
                ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort classrooms by name in ascending order
                .map((classroom) => ({
                  label: classroom.name,
                  value: classroom.id,
                }))}
              placeholder="Select Classroom"
            />
          </Form.Item>
        </div>

        <div className="row ">
          <div className="col-md-5">
            <div className=" label-12-400 mb12">
              From week<span className="text-danger">*</span>
            </div>
            <Form.Item name="fromWeek">
              <WeekDatePicker
                onRangeChange={handleRangeChange}
                showButtons={false}
                bgBorder={true}
                fontSize={14}
              />
            </Form.Item>
          </div>
          <div className="col-md-5">
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
        </div>

        <div className="text-center">
          <ButtonComponent
            text={isCopying ? "Processing..." : "Confirm"}
            padding="14px 45px"
            type="submit"
            disabled={isCopying} // Disable button while mutation is in progress
          />
        </div>
      </Form>
    </div>
  );
}
