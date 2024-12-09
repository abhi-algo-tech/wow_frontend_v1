import { Form, Input, InputNumber, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { useCreatePickup, useUpdatePickup } from "../../hooks/useStudent";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

function AddPickup({
  cardTitle,
  selectedStudentData,
  selectedGaurdianData,
  closeModal,
}) {
  const [form] = Form.useForm();

  const createPickupMutation = useCreatePickup();
  const updatePickupMutation = useUpdatePickup();
  const isEdit = Boolean(selectedGaurdianData?.studentPickupId);

  useEffect(() => {
    if (selectedGaurdianData) {
      form.setFieldsValue({
        firstName: selectedGaurdianData?.firstName,
        lastName: selectedGaurdianData?.lastName,
        phoneNumber: selectedGaurdianData?.phoneNumber,
        relation: selectedGaurdianData?.relation,
      });
    }
  }, [selectedGaurdianData, form]);

  const handleSubmit = (values) => {
    const { firstName, lastName, relation, phoneNumber } = values;

    if (!firstName || !lastName) {
      message.error("All fields are required!");
      return;
    }
    const pickupId = selectedGaurdianData?.studentPickupId;
    const formData = new FormData();
    formData.append("studentId", selectedStudentData?.studentId);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("relation", relation);

    if (isEdit) {
      updatePickupMutation.mutate(
        {
          pickupId,
          pickupData: formData,
        },
        {
          onSuccess: () => {
            closeModal();
            CustomMessage.success(`pickup updated sucessfully`);
          },
        }
      );
    } else {
      createPickupMutation.mutate(formData, {
        onSuccess: () => {
          closeModal();
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
        {cardTitle}
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

            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Phone Number
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Contact number must be numeric!",
                  },
                ]}
              >
                <InputNumber
                  maxLength={10}
                  minLength={10}
                  placeholder="E.g. (000) 000-0000"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Relation
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item name="relation">
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  <Option value="select">Select</Option>
                  <Option value="Father">Father</Option>
                  <Option value="Mother">Mother</Option>
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

export default AddPickup;
