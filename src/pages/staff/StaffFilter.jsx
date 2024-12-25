import React from "react";
import { Select, Form } from "antd";
import ButtonComponent from "../../components/ButtonComponent";
import { CustomMessage } from "../../utils/CustomMessage";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";

const { Option } = Select;

function StaffFilter({
  CardTitle,
  closeModal,
  onApplyFilter,
  classrooms,
  formValues,
}) {
  // Fetch status and designation using custom hooks
  const { data: status } = useMasterLookupsByType("status");
  const { data: designation } = useMasterLookupsByType("designation");

  // Handle form submission
  const handleFormSubmit = (values) => {
    // Filter out undefined values
    const appliedFilters = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(appliedFilters).length > 0) {
      onApplyFilter(appliedFilters); // Pass selected filters
      closeModal(); // Close modal after applying filters
    } else {
      CustomMessage.info(
        "No filter applied! Select filter or close the modal."
      );
    }
  };

  return (
    <div className="card">
      {/* Card Title */}
      <div
        style={{
          backgroundColor: "#eef1fe",
          fontWeight: "bold",
          padding: "19px 40px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        {CardTitle}
      </div>

      {/* Form Section */}
      <div className="student-create">
        <Form
          onFinish={handleFormSubmit}
          initialValues={formValues} // Default form values
        >
          <div className="row">
            {/* Classroom Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Classroom
              </label>
              <Form.Item name="classroom">
                <Select
                  className="w-100 select-student-add-from"
                  placeholder="Select Classroom"
                >
                  <Option value={undefined}>Select</Option>
                  {classrooms?.map((item, i) => (
                    <Option key={i} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Designation Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Designation
              </label>
              <Form.Item name="designation">
                <Select
                  className="w-100 select-student-add-from"
                  placeholder="Select Designation"
                >
                  <Option value={undefined}>Select</Option>
                  {designation?.data?.map((item, i) => (
                    <Option key={i} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Status Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Status
              </label>
              <Form.Item name="status">
                <Select
                  className="w-100 select-student-add-from"
                  placeholder="Select Status"
                >
                  <Option value={undefined}>Select</Option>
                  {status?.data?.map((item, i) => (
                    <Option key={i} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            <ButtonComponent
              text="Apply Filter"
              type="primary"
              htmlType="submit"
              style={{ marginRight: 8 }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StaffFilter;
