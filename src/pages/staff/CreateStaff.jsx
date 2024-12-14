import { Form, Input, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import {
  useCreateStaff,
  useStaffById,
  useUpdateStaff,
} from "../../hooks/useStaff";
import { CustomMessage } from "../../utils/CustomMessage";
import { useSession } from "../../hooks/useSession";

const { Option } = Select;

function CreateStaff({ CardTitle, staffId, closeModal }) {
  const { academyId } = useSession();
  const [form] = Form.useForm();
  const [selectedAllowedClassrooms, setSelectedAllowedClassrooms] = useState(
    []
  );

  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(academyId);
  const { data: staffData } = useStaffById(staffId);
  const createStudentMutation = useCreateStaff();
  const updateStudentMutation = useUpdateStaff();
  const isEdit = Boolean(staffId);

  useEffect(() => {
    console.log("staffData:", staffData);
    if (staffData) {
      const primaryClassroom = staffData.data.classrooms.find(
        (classroom) => classroom.id === staffData.data.primaryRoomId
      );

      form.setFieldsValue({
        firstName: staffData.data.firstName,
        lastName: staffData.data.lastName,
        email: staffData.data.email,
        phoneNumber: staffData.data.phoneNumber,
        designation: staffData.data.designation,
        allowedClassrooms: staffData.data.classrooms.map(
          (classroom) => classroom.id
        ),
        primaryClassroom: primaryClassroom ? primaryClassroom.id : undefined,
        status: staffData.data.status,
      });
      setSelectedAllowedClassrooms(
        staffData.data.classrooms.map((classroom) => classroom.id)
      );
    }
  }, [staffData, form]);

  const handleSubmit = (values) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      designation,
      primaryClassroom,
      status,
      allowedClassrooms,
    } = values;

    if (!firstName || !lastName || designation === "select") {
      CustomMessage.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("designation", designation);
    formData.append("primaryRoomId", primaryClassroom);
    formData.append("status", status);

    // Add allowedClassrooms as classroomIds[]
    allowedClassrooms.forEach((classroomId, index) => {
      formData.append(`classroomIds[]`, classroomId);
    });

    if (isEdit) {
      updateStudentMutation.mutate(
        {
          staffId, // Use staffId instead of studentId
          staffData: formData,
        },
        {
          onSuccess: () => {
            CustomMessage.success("Staff updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to update staff: ${error.message}`);
          },
        }
      );
    } else {
      createStudentMutation.mutate(formData, {
        onSuccess: () => {
          CustomMessage.success("Staff created successfully!");
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(`Failed to create staff: ${error.message}`);
        },
      });
    }
  };

  const handleTagChange = (value) => {
    setSelectedAllowedClassrooms(value);
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
        {CardTitle}
      </span>
      <div className="student-create">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                First Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input the first name!" },
                ]}
              >
                <Input
                  placeholder="E.g. John"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Last Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please input the last name!" },
                ]}
              >
                <Input
                  placeholder="E.g. Smith"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className=" items-center gap-1 student-label ">
              Email
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input the email address!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="E.g. jane.doe@example.com"
                className="w-100 student-form-input"
              />
            </Form.Item>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Phone Number
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input the contact number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Contact number must be numeric!",
                  },
                ]}
              >
                <Input
                  placeholder="E.g. (000) 000-0000"
                  className="w-100 student-form-input"
                  maxLength={10}
                  minLength={10}
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Designation
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="designation"
                rules={[
                  {
                    required: true,
                    message: "Please select the Primary Classroom!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="Admin">Admin</Option>
                  <Option value="Staff">Staff</Option>
                </Select>
              </Form.Item>
            </div>
            <div className=" items-center gap-1 student-label ">
              Allowed Classrooms
              <span className="text-danger"> *</span>
            </div>

            <Form.Item
              name="allowedClassrooms"
              rules={[
                {
                  required: true,
                  message: "Please select at least one classroom!",
                },
              ]}
            >
              <MultiSelectWithTags
                value={selectedAllowedClassrooms}
                onChange={handleTagChange}
                name="allowedClassrooms"
                options={
                  !isLoading &&
                  classroomData?.data
                    ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort classrooms by name in ascending order
                    .map((classroom) => ({
                      label: classroom.name,
                      value: classroom.id,
                    }))
                }
                loading={isLoading}
                placeholder="Select"
              />
            </Form.Item>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Primary Classroom
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="primaryClassroom"
                rules={[
                  {
                    required: true,
                    message: "Please select the Primary Classroom!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                  disabled={selectedAllowedClassrooms.length === 0} // Disable until at least one Allowed Classroom is selected
                >
                  {selectedAllowedClassrooms
                    .sort((a, b) =>
                      classroomData?.data
                        ?.find((c) => c.id === a)
                        ?.name.localeCompare(
                          classroomData?.data?.find((c) => c.id === b)?.name
                        )
                    ) // Sort based on classroom names
                    .map((id) => {
                      const classroom = classroomData?.data?.find(
                        (c) => c.id === id
                      );
                      return (
                        <Option key={id} value={id}>
                          {classroom?.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Status
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please select the status!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Deactive">Deactive</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={isEdit ? "Save" : "Add"}
                  padding="19.1px 115px"
                  type="submit"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateStaff;
