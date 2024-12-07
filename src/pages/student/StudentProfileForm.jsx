import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import FileUploadComponent from "../../components/fileUpload/FileUploadComponent";
import YesNoRadio from "../../components/radio/YesNoRadio";
import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { useGetAllClassrooms } from "../../hooks/useClassroom";
import { useGetAllCountries } from "../../hooks/useCountry";
import { useGetAllStates } from "../../hooks/useState";
import { useGetAllCities } from "../../hooks/useCity";

const { Option } = Select;

function StudentProfileForm({ CardTitle, studentId, studentData, closeModal }) {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedOption, setSelectedOption] = useState("no");

  // const { data: parentData } = useStudentById(studentId);
  const { data: statusData } = useMasterLookupsByType("status");
  const { data: custodyData } = useMasterLookupsByType("parent");
  const { data: countries } = useGetAllCountries();
  const { data: states } = useGetAllStates();
  const { data: cities } = useGetAllCities();
  const { data: tagData, isLoading } = useMasterLookupsByType("tags");
  const { data: classroomData } = useGetAllClassrooms();
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);

  const statusOptions = {
    items: statusData?.data?.map((status) => ({
      key: status.id.toString(), // Convert id to string as keys are typically strings
      label: status.name, // Use the name property for the label
    })),
  };
  const classRoomOptions = {
    items: classroomData?.data?.map((classroom) => ({
      key: classroom.id.toString(), // Convert id to string as keys are typically strings
      label: classroom.name, // Use the name property for the label
    })),
  };
  const custodyOptions = {
    items: custodyData?.data?.map((custody) => ({
      key: custody.id.toString(), // Convert id to string as keys are typically strings
      label: custody.name, // Use the name property for the label
    })),
  };
  const counntryOptions = {
    items: countries?.data?.map((country) => ({
      key: country.id.toString(), // Convert id to string as keys are typically strings
      label: country.name, // Use the name property for the label
    })),
  };
  const stateOptions = {
    items: states?.data?.map((state) => ({
      key: state.id.toString(), // Convert id to string as keys are typically strings
      label: state.name, // Use the name property for the label
    })),
  };
  const cityOptions = {
    items: cities?.data?.map((city) => ({
      key: city.id.toString(), // Convert id to string as keys are typically strings
      label: city.name, // Use the name property for the label
    })),
  };

  useEffect(() => {
    if (studentData) {
      setSelectedOption(studentData.isStateSubsidy ? "Yes" : "No");
      form.setFieldsValue({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        status: studentData.status,
        classroom: studentData.classroomName,
        birthDate: studentData.dateOfBirth,
        isStateSubsidy: studentData.isStateSubsidy,
        tags: studentData.tags.map((tag) => tag.tagId),
        notes: studentData.note,
        childCustody: studentData.childCustody,
        address: studentData.addressLine,
        city: studentData?.city?.name,
        state: studentData?.state?.name,
        country: studentData?.country?.name,
        zipCode: studentData.zipCode,
      });
      setSelectedTags(studentData.tags.map((tag) => tag.tagId));
    }
  }, [studentData, form]);

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };
  const handleSubmit = (values) => {
    const {
      firstName,
      lastName,
      status,
      classroom,
      birthDate,
      isStateSubsidy,
      tags,
      notes,
      childCustody,
      address,
      city,
      state,
      country,
      zipCode,
    } = values;

    if (!firstName || !lastName) {
      message.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("status", status);
    formData.append("classroom", classroom);
    formData.append("birthDate", birthDate);
    formData.append("isStateSubsidy", isStateSubsidy);
    formData.append("notes", notes);
    formData.append("childCustody", childCustody);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zipCode", zipCode);

    tags.forEach((tagId, index) => {
      formData.append(`tagIds[]`, tagId);
    });

    if (isEdit) {
      updateStudentMutation.mutate(
        {
          studentId,
          studentData: formData,
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
  };

  const handleChange = (e) => {
    console.log("Selected Value:", e.target.value);
  };

  const options = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
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
            <div className="col-3">
              <div className="flex items-center gap-1 student-label">
                First Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input the First Name!",
                  },
                ]}
              >
                <Input
                  placeholder="First Name"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <div className="flex items-center gap-1 student-label">
                Last Name
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input the Last Name!",
                  },
                ]}
              >
                <Input
                  placeholder="Last Name"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">
                Status
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="status"
                // Uncomment if validation is needed
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select the Status!",
                //   },
                // ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {statusOptions.items?.map((status) => (
                    <Option key={status.key} value={status.key}>
                      {status.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">
                Classroom
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="classroom"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select the Classroom!",
                //   },
                // ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {classRoomOptions.items?.map((classRoom) => (
                    <Option key={classRoom.key} value={classRoom.key}>
                      {classRoom.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Birthdate
              </div>

              <CustomDatePicker
                name="birthDate"
                // rules={[
                //   { required: true, message: "Please select the Document Type!" },
                // ]}
              />
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                State Subsidy
              </div>
              <YesNoRadio
                options={options}
                name="isStateSubsidy"
                value={selectedOption}
                onChange={handleChange}
              />
            </div>

            <div className=" items-center gap-1 student-label ">
              Select Tags
              <span className="text-danger"> *</span>
            </div>

            <Form.Item
              name="tags"
              rules={[
                { required: true, message: "Please select at least one tag" },
              ]}
            >
              <MultiSelectWithTags
                name="tags"
                value={selectedTags}
                onChange={handleTagChange}
                options={
                  !isLoading &&
                  tagData?.data
                    ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort classrooms by name in ascending order
                    .map((tag) => ({
                      label: tag.name,
                      value: tag.id,
                    }))
                }
                loading={isLoading}
                placeholder="Select"
              />
            </Form.Item>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Notes
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="notes"
                rules={[
                  {
                    required: true,
                    message: "Please input the Notes!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Child Custody
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="childCustody"
                rules={[
                  {
                    required: true,
                    message: "Please select the Child Custody!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {custodyOptions.items?.map((custody) => (
                    <Option key={custody.key} value={custody.key}>
                      {custody.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Address Line
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input the Address Line!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                City
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please select the city!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {cityOptions.items?.map((city) => (
                    <Option key={city.key} value={city.key}>
                      {city.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                State
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Please select the State!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {stateOptions.items?.map((state) => (
                    <Option key={state.key} value={state.key}>
                      {state.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Country
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please select the Country!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {counntryOptions.items?.map((country) => (
                    <Option key={country.key} value={country.key}>
                      {country.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Zip Code
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="zipCode"
                rules={[
                  {
                    required: true,
                    message: "Please input the Zip Code!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Report Card"
                  className="w-100 student-form-input"
                />
              </Form.Item>
            </div>
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
        </Form>
      </div>
    </div>
  );
}

export default StudentProfileForm;
