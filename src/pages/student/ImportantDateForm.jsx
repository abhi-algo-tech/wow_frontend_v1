import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreateStudent, useStudentById, useUpdateStudent } from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";

const { Option } = Select;

function ImportantDateForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const { data: parentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (parentData) {
      form.setFieldsValue({
        enrollDate: parentData.data.enrollDate,
        schoolStartDate: parentData.data.schoolStartDate,
        currentClassroomDate: parentData.data.currentClassroomDate,
        upcomingMoveDate: parentData.data.upcomingMoveDate,
        schoolLeavingDate: parentData.data.schoolLeavingDate,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    const { status, date } = values;

    if (!status || !date ) {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("status", status);
    formData.append("date", date);
   
    if (isEdit) {
      updateStudentMutation.mutate(
        { 
          studentId, 
          parentData: formData 
        }, 
        {
          onSuccess: () => {
            message.success("Student updated successfully!");
            closeModal();
          },
          onError: (error) => {
            message.error(`Failed to update student: ${error.message}`);
          },
        }
      );
    } else {
      createStudentMutation.mutate(formData, {
        onSuccess: () => {
          message.success("Student created successfully!");
          closeModal();
        },
        onError: (error) => {
          message.error(`Failed to create student: ${error.message}`);
        },
      });
    }
  }
    

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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="row">
            <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            Enroll Date
            </div>
            <Form.Item
              name="enrollDate"
              rules={[
                { required: true, message: "enrollDate is required!" },
              ]}
            >
              <CustomDatePicker name="enrollDate" />
            </Form.Item>
            </div>
            <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            School Start Date
            </div>
            <Form.Item
              name="schoolStartDate"
              rules={[
                { required: true, message: "schoolStartDate is required!" },
              ]}
            >
              <CustomDatePicker name="schoolStartDate" />
            </Form.Item>
            </div>
            <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            Current Classroom Date
            </div>
            <Form.Item
              name="currentClassroomDate"
              rules={[
                { required: true, message: "currentClassroomDate is required!" },
              ]}
            >
              <CustomDatePicker name="currentClassroomDate" />
            </Form.Item>
            </div>
            <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            Upcoming Move Date
            </div>
            <Form.Item
              name="upcomingMoveDate"
              rules={[
                { required: true, message: "upcomingMoveDate is required!" },
              ]}
            >
              <CustomDatePicker name="upcomingMoveDate" />
            </Form.Item>
            </div>
            <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            School Leaving Date
            </div>
            <Form.Item
              name="schoolLeavingDate"
              rules={[
                { required: true, message: "schoolLeavingDate is required!" },
              ]}
            >
              <CustomDatePicker name="schoolLeavingDate" />
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

export default ImportantDateForm;
