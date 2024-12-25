import React from "react";
import { Select, Form } from "antd";
import { CustomMessage } from "../../utils/CustomMessage";
import ButtonComponent from "../../components/ButtonComponent";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";

const { Option } = Select;

function ApplyFilter({
  CardTitle,
  closeModal,
  onApplyFilter,
  classrooms,
  formValues,
}) {
  // Fetch status and tags using custom hooks
  const { data: status } = useMasterLookupsByType("status");
  const { data: tags } = useMasterLookupsByType("tags");

  // Generate unique classroom names
  const getUniqueNameAndId = (classrooms) => {
    const seen = new Set();
    return classrooms.filter((item) => {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        return true;
      }
      return false;
    });
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    const appliedFilters = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value)
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

      <div className="student-create">
        <Form onFinish={handleFormSubmit} initialValues={formValues}>
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
                  <Option value={null}>Select</Option>
                  {getUniqueNameAndId(classrooms)?.map((item) => (
                    <Option key={item.id} value={item.name}>
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
                  <Option value={null}>Select</Option>
                  {status?.data?.map((item) => (
                    <Option key={item.name} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Tag Select */}
            <div className="col-sm-4">
              <label className="gap-1 student-label select-student-add-from-drp-lable">
                Tag
              </label>
              <Form.Item name="tag">
                <Select
                  className="w-100 select-student-add-from"
                  placeholder="Select Tag"
                >
                  <Option value={null}>Select</Option>
                  {tags?.data?.map((item) => (
                    <Option key={item.name} value={item.name}>
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

export default ApplyFilter;
