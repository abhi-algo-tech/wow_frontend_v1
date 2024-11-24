import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreateStudent, useStudentById, useUpdateStudent } from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";

const { Option } = Select;

function PhysicalExaminationForm({ CardTitle, studentId, closeModal }) {
  const [form] = Form.useForm();

  const { data: parentData } = useStudentById(studentId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (parentData) {
      form.setFieldsValue({
        status: parentData.data.status,
        physicalCheckupDate: parentData.data.physicalCheckupDate,
      });
    }
  }, [parentData, form]);

  const handleSubmit = (values) => {
    const { status, physicalCheckupDate } = values;

    if (!status || !physicalCheckupDate ) {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("status", status);
    formData.append("physicalCheckupDate", physicalCheckupDate);
   
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
            Physical Checkup Date
            </div>
            <Form.Item
              name="physicalCheckupDate"
              rules={[
                { required: true, message: "physicalCheckupDate is required!" },
              ]}
            >
              <CustomDatePicker name="physicalCheckupDate" />
            </Form.Item>
            </div>
            <div className="col-6">
            <div className=" items-center gap-1 student-label ">
            Status
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item
              name="status"
            >
              <Select
                className="select-student-add-from"
                placeholder="Select"
              >
                <Option value="select">Select</Option>
                <Option value="1">Completed</Option>
                <Option value="2">Pending</Option>
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

export default PhysicalExaminationForm;
