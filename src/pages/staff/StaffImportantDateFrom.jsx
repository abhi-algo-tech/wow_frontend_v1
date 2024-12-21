import React, { useEffect, useState } from "react";
import { Form } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import { useUpdateStaff } from "../../hooks/useStaff";
import CustomDatePicker from "../../components/CustomDatePicker";
import { CustomMessage } from "../../utils/CustomMessage";

function StaffImportantDateForm({ CardTitle, staffId, closeModal, staffData }) {
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const updateStaffMutation = useUpdateStaff();
  const isEdit = Boolean(staffId);
  console.log("staffId", staffId);

  // Pre-fill form values when editing
  useEffect(() => {
    if (staffData) {
      form.setFieldsValue({
        hireDate: staffData?.hireDate,
        cdaExpirationDate: staffData?.cdaExpirationDate,
        aidExpirationDate: staffData?.aidExpirationDate,
        bgExpirationDate: staffData?.bgExpirationDate,
      });
    }
  }, [staffData, form]);

  // Handle form submission
  const handleSubmit = (values) => {
    setIsButton(true);
    const formData = new FormData();
    formData.append("hireDate", values.hireDate || "empty");
    formData.append("cdaExpirationDate", values.cdaExpirationDate || "empty");
    formData.append("aidExpirationDate", values.aidExpirationDate || "empty");
    formData.append("bgExpirationDate", values.bgExpirationDate || "empty");

    if (isEdit) {
      updateStaffMutation.mutate(
        {
          staffId: staffId,
          staffData: formData,
        },
        {
          onSuccess: () => {
            CustomMessage.success("Important date updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(
              `Failed to update Important date: ${error.message}`
            );
          },
        }
      );
    }
    // else {
    //   createStudentMutation.mutate(formData, {
    //     onSuccess: () => {
    //       CustomMessage.success("Important date created successfully!");
    //       closeModal();
    //     },
    //     onError: (error) => {
    //       CustomMessage.error(
    //         `Failed to create Important date: ${error.message}`
    //       );
    //     },
    //   });
    // }
  };

  const dateFields = [
    {
      name: "hireDate",
      label: "Hire Date",
      message: "Hire Date is required!",
    },
    {
      name: "cdaExpirationDate",
      label: "CDA Examination Date",
      message: "CDA Examination Date is required!",
    },
    {
      name: "aidExpirationDate",
      label: "First Aid/CPR Expiration Date",
      message: "First Aid/CPR Expiration Date is required!",
    },
    {
      name: "bgExpirationDate",
      label: "Background Record Check Expiration Date",
      message: "Background Record Check Expiration Date is required!",
    },
  ];

  return (
    <div className="card">
      <div
        style={{
          backgroundColor: "#eef1fe",
          fontWeight: "bold",
          padding: 15,
          borderRadius: "8px 8px 0 0",
        }}
      >
        {CardTitle}
      </div>
      <div className="staff-imp-date-form">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            {dateFields.map(({ name, label, message }) => (
              <div className="col-6" key={name}>
                <div className="items-center gap-1 student-label">{label}</div>
                <Form.Item
                  name={name}
                  // rules={[{ required: true, message }]}
                >
                  <CustomDatePicker name={name} />
                </Form.Item>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Form.Item>
              <ButtonComponent
                text="Save"
                padding="19.1px 65px"
                type="submit"
                isLoading={isButton}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StaffImportantDateForm;
