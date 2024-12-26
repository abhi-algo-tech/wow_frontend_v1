import { Form, Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useStudentBySchool,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import FileUploadComponent from "../../components/fileUpload/FileUploadComponent";
import YesNoRadio from "../../components/radio/YesNoRadio";
import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useGetAllCountries } from "../../hooks/useCountry";
import { useGetAllStates } from "../../hooks/useState";
import { useGetAllCities } from "../../hooks/useCity";
import { formatDateToCustomStyle } from "../../services/common";
import { CustomMessage } from "../../utils/CustomMessage";
import { useSession } from "../../hooks/useSession";
import MultiSelectWithoutColor from "../../components/select/MultiSelectWithoutColor";

const { Option } = Select;

function StudentProfileForm({ CardTitle, studentId, studentData, closeModal }) {
  const { academyId } = useSession();
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSiblings, setSelectedSiblings] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValues, setSelectedValues] = useState(null);

  // const { data: parentData } = useStudentById(studentId);
  const { data: statusData } = useMasterLookupsByType("status");
  const { data: custodyData } = useMasterLookupsByType("parent");
  const { data: countries } = useGetAllCountries();
  const { data: states } = useGetAllStates();
  const { data: cities } = useGetAllCities();
  const { data: tagData, isLoading } = useMasterLookupsByType("tags");
  const { data: classroomData } = useGetClassroomsBySchool(academyId);
  const { data: siblingsData } = useStudentBySchool(academyId);
  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const isEdit = Boolean(studentId);
  const [selectedDate, setSelectedDate] = useState("");

  const statusOptions = {
    items: statusData?.data?.map((status) => ({
      key: status.id, // Convert id to string as keys are typically strings
      label: status.name, // Use the name property for the label
    })),
  };
  const classRoomOptions = {
    items: classroomData?.data?.map((classroom) => ({
      key: classroom.id, // Convert id to string as keys are typically strings
      label: classroom.name, // Use the name property for the label
    })),
  };
  const siblingsOptions = {
    items: siblingsData?.data?.map((sibling) => ({
      key: sibling.id, // Convert id to string as keys are typically strings
      label: `${sibling.firstName} ${sibling.lastName} (${sibling.classroomName})`, // Use the name property for the label
    })),
  };
  // console.log("siblingsOptions:", siblingsOptions);
  const custodyOptions = {
    items: custodyData?.data?.map((custody) => ({
      key: custody.id, // Convert id to string as keys are typically strings
      label: custody.name, // Use the name property for the label
    })),
  };
  const counntryOptions = {
    items: countries?.data?.map((country) => ({
      key: country.id, // Convert id to string as keys are typically strings
      label: country.name, // Use the name property for the label
    })),
  };
  const stateOptions = {
    items: states?.data?.map((state) => ({
      key: state.id, // Convert id to string as keys are typically strings
      label: state.name, // Use the name property for the label
    })),
  };
  const cityOptions = {
    items: cities?.data?.map((city) => ({
      key: city.id, // Convert id to string as keys are typically strings
      label: city.name, // Use the name property for the label
    })),
  };

  useEffect(() => {
    if (studentData) {
      setSelectedOption(studentData.isStateSubsidy ? "yes" : "no");
      setSelectedDate(studentData.dateOfBirth);
      const mappedTags = studentData.tags.map((tag) => tag.tagId);
      const mappedSiblings = studentData.siblings.map(
        (sibling) => sibling.siblingId
      );
      form.setFieldsValue({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        status: studentData.statusId,
        classroom: studentData.classroomId,
        birthDate: studentData.dateOfBirth,
        isStateSubsidy: studentData.isStateSubsidy ? "yes" : "no",
        tags: mappedTags,
        notes: studentData.note,
        childCustody: studentData.childCustodyId,
        address: studentData.addressLine,
        city: studentData?.city?.id,
        state: studentData?.state?.id,
        country: studentData?.country?.id,
        zipCode: studentData?.zipCode,
        sibling: mappedSiblings,
      });
      setSelectedTags(mappedTags);
      setSelectedSiblings(mappedSiblings);
    }
  }, [studentData, form]);

  const handleTagChange = (value) => {
    setSelectedTags(value);
  };
  const handleSubmit = (values) => {
    setIsButton(true);
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
      sibling,
    } = values;

    if (!firstName || !lastName) {
      CustomMessage.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("statusId", status);
    formData.append("classroomId", classroom);
    if (birthDate) {
      // const formattedDate = new Date(birthDate).toISOString().split("T")[0]; // Format to 'yyyy-mm-dd'
      formData.append("dateOfBirth", birthDate);
    }
    formData.append("isStateSubsidy", selectedOption === "yes");
    formData.append("note", notes ? notes : "");
    if (childCustody) formData.append("childCustodyId", childCustody);
    formData.append("addressLine", address);
    formData.append("cityId", city);
    formData.append("stateId", state);
    formData.append("countryId", country);
    formData.append("zipCode", zipCode);

    tags.forEach((tagId) => formData.append("studentTags[]", tagId));
    sibling.forEach((siblingId) => formData.append("siblingId[]", siblingId));

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
            setIsButton(false);
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
          setIsButton(false);
        },
      });
    }
  };

  const handleChange = (e) => {
    console.log("Selected Value:", e.target.value);
    setSelectedOption(e.target.value);
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
                  { required: true, message: "Please input the first name!" }, // Required field rule
                  {
                    pattern: /^[A-Za-z`]*$/, // Regex to allow alphabets and backtick
                    message:
                      "First name can only contain alphabets and a backtick!",
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
                  { required: true, message: "Please input the last name!" }, // Required field rule
                  {
                    pattern: /^[A-Za-z`]*$/, // Regex to allow alphabets and backtick
                    message:
                      "Last name can only contain alphabets and a backtick",
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
                <span className="text-danger"> *</span>
              </div>

              {/* <input
                type="date"
                name="birthDate"
                value="2024-12-22"
                className="custom-date-picker"
              /> */}
              <Form.Item
                name="birthDate"
                rules={[{ required: true, message: "Please select birthDate" }]}
              >
                <CustomDatePicker
                  name="birthDate"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  required
                />
              </Form.Item>
              {/* <CustomDatePicker
                name="birthDate"
                value={studentData?.dateOfBirth} // Ensure it's parsed
              /> */}
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                State Subsidy
              </div>
              <YesNoRadio
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
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
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="notes"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input the Notes!",
                //   },
                // ]}
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
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item
                name="childCustody"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select the Child Custody!",
                //   },
                // ]}
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
                  value={studentData?.city}
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
                  maxLength={5}
                  minLength={5}
                  onKeyPress={(event) => {
                    if (!/^[0-9]$/.test(event.key)) {
                      event.preventDefault(); // Prevent non-numeric characters
                    }
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className="flex items-center gap-1 student-label">
                Sibling
                {/* <span className="text-danger"> *</span> */}
              </div>
              <Form.Item name="sibling">
                <MultiSelectWithoutColor
                  name="sibling"
                  placeholder="Select"
                  options={
                    !isLoading
                      ? Array.isArray(siblingsOptions?.items)
                        ? siblingsOptions.items
                            .filter((sibling) => sibling.key !== studentId) // Filter out the object where key === studentId
                            .sort((a, b) => a.label.localeCompare(b.label)) // Sort alphabetically by label
                            .map((sibling) => ({
                              label: sibling.label,
                              value: sibling.key, // Map to label and value structure
                            }))
                        : [] // Default to an empty array if siblingsOptions.items is not an array
                      : [] // Default to an empty array if loading
                  }
                  value={selectedSiblings}
                  onChange={setSelectedValues}
                />
              </Form.Item>
            </div>
          </div>
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
        </Form>
      </div>
    </div>
  );
}

export default StudentProfileForm;
