import { Form, Input, InputNumber, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useCreateStudent,
  useStudentById,
  useUpdateStudent,
} from "../../hooks/useStudent";
import CustomDatePicker from "../../components/CustomDatePicker";
import MultiSelectComponent from "../../components/multiSelect/MultiSelectComponent";
import { CustomMessage } from "../../utils/CustomMessage";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useSession } from "../../hooks/useSession";
import MultiSelectWithTags from "../../components/select/MultiSelectWithTags";
import { useGetAllCountries } from "../../hooks/useCountry";
import { useGetAllStates } from "../../hooks/useState";
import { useGetAllCities } from "../../hooks/useCity";
import { useCreateStaff, useUpdateStaff } from "../../hooks/useStaff";

const { Option } = Select;

function StaffProfileForm({ CardTitle, staffData, closeModal }) {
  const { academyId } = useSession();
  const [form] = Form.useForm();
  const [isButton, setIsButton] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAllowedClassrooms, setSelectedAllowedClassrooms] = useState(
    []
  );

  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(academyId);
  const { data: statusData } = useMasterLookupsByType("status");
  const { data: designationData } = useMasterLookupsByType("designation");
  const { data: jobTagData } = useMasterLookupsByType("job_tag");
  const { data: countries } = useGetAllCountries();
  const { data: states } = useGetAllStates();
  const { data: cities } = useGetAllCities();
  const createStaffMutation = useCreateStaff();
  const updateStaffMutation = useUpdateStaff();
  const isEdit = Boolean(staffData.id);

  const statusOptions = {
    items: statusData?.data?.map((status) => ({
      key: status.id, // Convert id to string as keys are typically strings
      label: status.name, // Use the name property for the label
    })),
  };
  const designationOptions = {
    items: designationData?.data?.map((designation) => ({
      key: designation.id, // Convert id to string as keys are typically strings
      label: designation.name, // Use the name property for the label
    })),
  };
  const jobTagOptions = {
    items: jobTagData?.data?.map((jobTag) => ({
      key: jobTag.id, // Convert id to string as keys are typically strings
      label: jobTag.name, // Use the name property for the label
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
    if (staffData) {
      const primaryClassroom = staffData?.classrooms.find(
        (classroom) => classroom.id === staffData?.primaryRoomId
      );
      setSelectedDate(staffData?.dateOfBirth);
      form.setFieldsValue({
        firstName: staffData?.firstName,
        lastName: staffData?.lastName,
        status: staffData?.statusId,
        phoneNumber: staffData?.phoneNumber,
        designation: staffData?.designationId,
        birthDate: staffData?.dateOfBirth,
        email: staffData?.email,
        street: staffData?.street,
        allowedClassrooms: staffData?.classrooms?.map(
          (classroom) => classroom.id
        ),
        primaryClassroom: primaryClassroom ? primaryClassroom.id : undefined,
        city: staffData?.city?.id,
        state: staffData?.state?.id,
        country: staffData?.country?.id,
        zipCode: staffData?.zipCode,
        jobTag: staffData?.jobTag?.id,
      });
      setSelectedAllowedClassrooms(
        staffData?.classrooms?.map((classroom) => classroom.id)
      );
    }
  }, [staffData, form]);

  const handleTagChange = (value) => {
    setIsButton(true);
    setSelectedAllowedClassrooms(value);
    setSelectedTags(value);
    const shouldResetPrimaryClassroom = !value.some((classroomId) => {
      return staffData?.primaryRoomId === classroomId;
    });
    if (shouldResetPrimaryClassroom) {
      form.setFieldValue("primaryClassroom", null); // Reset primaryClassroom
    }
  };
  //   console.log("selectedClassrooms", selectedClassrooms);

  const handleSubmit = (values) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      designation,
      primaryClassroom,
      status,
      email,
      allowedClassrooms,
      birthDate,
      street,
      city,
      state,
      country,
      zipCode,
      jobTag,
    } = values;

    if (!firstName || !lastName || !phoneNumber || !email) {
      CustomMessage.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("designationId", designation);
    formData.append("primaryRoomId", primaryClassroom);
    formData.append("statusId", status);
    formData.append("dateOfBirth", birthDate);
    formData.append("email", email);
    formData.append("street", street);
    // Add allowedClassrooms as classroomIds[]
    allowedClassrooms.forEach((classroomId, index) => {
      formData.append(`classroomIds[]`, classroomId);
    });
    formData.append("cityId", city);
    formData.append("stateId", state);
    formData.append("countryId", country);
    formData.append("zipCode", zipCode);
    formData.append("jobTagId", jobTag);

    if (isEdit) {
      updateStaffMutation.mutate(
        {
          staffId: staffData.id, // Use staffId instead of studentId
          staffData: formData,
        },
        {
          onSuccess: () => {
            CustomMessage.success("Staff updated successfully!");
            closeModal();
          },
          onError: (error) => {
            CustomMessage.error(`Failed to update staff: ${error.message}`);
          },
        }
      );
    } else {
      createStaffMutation.mutate(formData, {
        onSuccess: () => {
          CustomMessage.success("Staff created successfully!");
          closeModal();
        },
        onError: (error) => {
          CustomMessage.error(`Failed to create staff: ${error.message}`);
        },
      });
    }
  };

  const handleChange = (e) => {
    console.log("Selected Value:", e.target.value);
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
              <div className=" items-center gap-1 student-label ">Status</div>
              <Form.Item name="status">
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                >
                  {statusOptions?.items?.map((status) => (
                    <Option key={status.key} value={status.key}>
                      {status.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">
                Designation
              </div>
              <Form.Item name="designation">
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                  defaultActiveFirstOption={1}
                >
                  {designationOptions?.items?.map((designation) => (
                    <Option key={designation.key} value={designation.key}>
                      {designation.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-12">
              <div className=" items-center gap-1 student-label ">
                Allowed Classrooms<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="allowedClassrooms"
                rules={[
                  {
                    required: true,
                    message: "Please select allowed Classroom",
                  },
                ]}
              >
                <MultiSelectWithTags
                  value={selectedAllowedClassrooms}
                  onChange={handleTagChange}
                  name="allowedClassrooms"
                  options={
                    !isLoading &&
                    classroomData?.data
                      ?.sort((a, b) => a.name.localeCompare(b.name)) // Sort classrooms by name in ascending order
                      .map((classroom) => ({
                        label: classroom.name,
                        value: classroom.id,
                      }))
                  }
                  loading={isLoading}
                  placeholder="Select"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Primary Classroom<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="primaryClassroom"
                rules={[
                  {
                    required: true,
                    message: "Please select Primary Classroom!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                  disabled={selectedAllowedClassrooms.length === 0} // Disable until at least one Allowed Classroom is selected
                >
                  {selectedAllowedClassrooms
                    .sort((a, b) =>
                      classroomData?.data
                        ?.find((c) => c.id === a)
                        ?.name.localeCompare(
                          classroomData?.data?.find((c) => c.id === b)?.name
                        )
                    ) // Sort based on classroom names
                    .map((id) => {
                      const classroom = classroomData?.data?.find(
                        (c) => c.id === id
                      );
                      return (
                        <Option key={id} value={id}>
                          {classroom?.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Birthdate
              </div>

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
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Email<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the Email!",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email!",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Jessica@wowcare.com"
                  className="w-100 student-form-input"
                  type="email"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <div className=" items-center gap-1 student-label ">
                Phone Number<span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input the Number!",
                  },
                ]}
              >
                <Input
                  placeholder="E.g. (000) 000-0000"
                  className="w-100 student-form-input"
                  type="text"
                  maxLength={10}
                  minLength={10}
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
                Street
                <span className="text-danger"> *</span>
              </div>
              <Form.Item
                name="street"
                rules={[
                  {
                    required: true,
                    message: "Please input the Street!",
                  },
                ]}
              >
                <Input
                  placeholder="Eg. Street no"
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
                    message: "Please input the City!",
                  },
                ]}
              >
                <Select
                  className="select-student-add-from"
                  placeholder="Select"
                  value={staffData?.city}
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
                  type="text"
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
            <div className="col-3">
              <div className=" items-center gap-1 student-label ">Job Tag</div>
              <Form.Item name="jobTag">
                <Select
                  // className="select-student-add-form"
                  className="select-student-add-from"
                  placeholder="Select"
                  // defaultActiveFirstOption={true} // Correct usage
                >
                  {jobTagOptions.items?.map((jobTag) => (
                    <Option key={jobTag.key} value={jobTag.key}>
                      {jobTag.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="text-center mt5">
            <Form.Item>
              <ButtonComponent
                text={"Save"}
                padding="16.1px 60px"
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

export default StaffProfileForm;
