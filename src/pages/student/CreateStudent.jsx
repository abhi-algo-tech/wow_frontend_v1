import { Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { CustomMessage } from "../../utils/CustomMessage";
import { useSession } from "../../hooks/useSession";

const { Option } = Select;

function CreateStudent({ CardTitle, studentId, closeModal }) {
  const { academyId } = useSession();
  const [isButton, setIsButton] = useState(false);
  const [form] = Form.useForm();

  const { data: studentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(academyId);
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        firstName: studentData.data.firstName,
        lastName: studentData.data.lastName,
        classroom: studentData.data.classroomId,
      });
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    setIsButton(true);
    const { firstName, lastName, classroom } = values;

    if (!firstName || !lastName || classroom === "select") {
      CustomMessage.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("statusId", 4);
    formData.append("classroomId", classroom);
    formData.append("schoolId", academyId);

    if (isEdit) {
      updateStudentMutation.mutate(
        {
          studentId,
          studentData: formData,
        },
        {
          onSuccess: () => {
            CustomMessage.success("Student updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to update student: ${error.message}`);
          },
        }
      );
    } else {
      createStudentMutation.mutate(formData, {
        onSuccess: () => {
          CustomMessage.success("Student created successfully!");
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(`Failed to create student: ${error.message}`);
        },
      });
    }
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
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message:
                      "First name should not contain numbers or special characters!",
                  },
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
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message:
                      "Last name should not contain numbers or special characters!",
                  },
                ]}
              >
                <Input
                  placeholder="E.g. Smith"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className="flex items-center gap-1 student-label ">
              Select Classroom
              <span className="text-danger"> *</span>
            </div>
            <Form.Item
              name="classroom"
              rules={[
                { required: true, message: "Please select a classroom!" },
              ]}
            >
              <Select
                className="select-student-add-from"
                placeholder="Select Classroom"
                loading={isLoading}
                notFoundContent={
                  isError
                    ? `Error: ${error?.message}`
                    : "No classrooms available"
                }
              >
                {!isLoading &&
                  classroomData?.data
                    ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort classrooms by name in ascending order
                    .map((classroom) => (
                      <Option key={classroom.id} value={classroom.id}>
                        {classroom.name}
                      </Option>
                    ))}
              </Select>
            </Form.Item>

            <div className="text-center mt6">
              <Form.Item>
                <ButtonComponent
                  text={isEdit ? "Save" : "Add"}
                  padding="19.1px 115px"
                  type="submit"
                  isLoading={isButton}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateStudent;
