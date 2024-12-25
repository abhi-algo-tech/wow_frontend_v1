import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import { CustomMessage } from "../../utils/CustomMessage";
// import CustomDatePicker from "../../components/CustomDatePicker";

function HealthDetailsForm({ CardTitle, studentData, studentId, closeModal }) {
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        allergies: studentData.data.allergies,
        medications: studentData.data.medications,
        dietRestriction: studentData.data.dietRestriction,
        // lastPhysicalDate: studentData.data.lastPhysicalDate,
      });
    }
  }, [studentData, form]);

  const handleSubmit = (values) => {
    setIsButton(true);
    const { allergies, medications, dietRestriction } = values;

    const formData = new FormData();
    formData.append("allergies", allergies || "No Allergies");
    formData.append("medications", medications || "No Medications");
    formData.append(
      "dietRestriction",
      dietRestriction || "No Diet Restrictions"
    );
    // formData.append("lastPhysicalDate", lastPhysicalDate.format("YYYY-MM-DD"));

    if (isEdit) {
      console.log("first");
      updateStudentMutation.mutate(
        { studentId, studentData: formData },
        {
          onSuccess: () => {
            CustomMessage.success(
              "Student Health details updated successfully!"
            );
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(
              `Failed to update student Health details: ${error.message}`
            );
          },
        }
      );
    } else {
      console.log("second");
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
            <div className=" items-center gap-1 student-label ">
              Allergies
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item name="allergies">
              <Input
                placeholder="No Allergies"
                className="w-100 student-form-input"
              />
            </Form.Item>
            <div className=" items-center gap-1 student-label ">
              Medications
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item
              name="medications"
              // rules={[
              //     { required: true, message: "Please input the email address!" },
              //     { type: "email", message: "Please enter a valid email address!" },
              //   ]}
            >
              <Input
                placeholder="No Medications"
                className="w-100 student-form-input"
              />
            </Form.Item>
            <div className=" items-center gap-1 student-label ">
              Diet Restrictions
              {/* <span className="text-danger"> *</span> */}
            </div>
            <Form.Item name="dietRestriction">
              <Input
                placeholder="No Diet Restrictions"
                className="w-100 student-form-input"
              />
            </Form.Item>

            {/* <div className=" items-center gap-1 student-label ">
              Last Physical Date
            </div>
            <Form.Item
              name="lastPhysicalDate"
              rules={[
                { required: true, message: "Last Physical Date is required!" },
              ]}
            >
              <CustomDatePicker name="lastPhysicalDate" />
            </Form.Item> */}

            <div className="text-center ">
              <Form.Item>
                <ButtonComponent
                  text={isEdit ? "Save" : "Add"}
                  padding="0px 65px"
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

export default HealthDetailsForm;
