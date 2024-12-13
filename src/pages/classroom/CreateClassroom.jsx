import { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Upload,
  message,
} from "antd";
import { debounce } from "lodash";
import { UploadOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useClassroomById,
  useCreateClassroom,
  useUpdateClassroom,
  useValidateClassroom,
} from "../../hooks/useClassroom";
import ProfileImageComponent from "../../components/ProfileImageComponent";
import { validateMinMaxAge } from "../../utils/customValidation";
import { CustomMessage } from "../../utils/CustomMessage";

function CreateClassroom({ CardTitle, classroomId, closeModal }) {
  const [form] = Form.useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { mutate: createClassroom } = useCreateClassroom();
  const { mutate: updateClassroom } = useUpdateClassroom();
  const { data: classroomData } = useClassroomById(classroomId);
  const [classroomName, setClassroomName] = useState("");
  const {
    error,
    validationMessage,
    validate: validateClassroomName,
  } = useValidateClassroom({
    name: classroomName,
    id: classroomId,
  });
  const isEdit = Boolean(classroomId); // Check if editing

  const lastValidatedName = useRef(null); // To store the last validated name
  const lastValidatedId = useRef(null); // To store the last validated ID

  // Debounced validate function
  const debouncedValidate = useCallback(
    debounce((name, id) => {
      // Only hit the API if the name or ID is different
      if (
        lastValidatedName.current !== name ||
        lastValidatedId.current !== id
      ) {
        validateClassroomName(name.trim(), id);
        lastValidatedName.current = name; // Update the last validated name
        lastValidatedId.current = id; // Update the last validated ID
      }
    }, 2000),
    [validateClassroomName]
  );

  useEffect(() => {
    if (classroomName.trim() !== "") {
      debouncedValidate(classroomName, classroomId);
    }
    return () => debouncedValidate.cancel(); // Cleanup debounce
  }, [classroomName, classroomId, debouncedValidate]);

  // const handleFileChange = ({ fileList: newFileList }) => {
  //   console.log("newFileList:", newFileList[0]);
  //   setFileList(newFileList);
  //   if (newFileList.length > 0) {
  //     setProfilePicture(newFileList[0].originFileObj);
  //   } else {
  //     setProfilePicture(null);
  //   }
  // };
  const handleFileChange = (newFileList) => {
    // Extract the file object from the newFileList
    setFileList(newFileList);
    if (newFileList && newFileList.length > 0) {
      setProfilePicture(newFileList[0].originFileObj); // Save the actual file for submission
      setIsProfile(true);
    } else {
      setProfilePicture(null); // Handle case when file is removed
    }
  };

  useEffect(() => {
    if (classroomData) {
      const ageRange = classroomData.data.ageRange || "0.0-0.0";
      const [minAge, maxAge] = ageRange.split("-");
      const [minAgeYear, minAgeMonth] = minAge.split(".");
      const [maxAgeYear, maxAgeMonth] = maxAge.split(".");

      form.setFieldsValue({
        classroomName: classroomData.data.name,
        capacity: classroomData.data.maxCapacity,
        ratio: classroomData.data.staffRatio,
        minAgeYear: parseInt(minAgeYear, 10),
        minAgeMonth: parseInt(minAgeMonth, 10),
        maxAgeYear: parseInt(maxAgeYear, 10),
        maxAgeMonth: parseInt(maxAgeMonth, 10),
        active: classroomData.data.status === "Active",
      });

      if (classroomData.data.profileUrl) {
        setFileList([
          {
            uid: "-1",
            name: "profilePicture",
            status: "done",
            url: classroomData.data.profileUrl,
          },
        ]);
      }
    }
  }, [classroomData, form]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.classroomName);
    formData.append(
      "ageRange",
      `${values.minAgeYear}.${values.minAgeMonth}-${values.maxAgeYear}.${values.maxAgeMonth}`
    );
    formData.append("maxCapacity", values.capacity);
    formData.append("staffRatio", values.ratio);
    formData.append("status", values.active ? "Active" : "Inactive");
    formData.append("roomNumber", "A101");
    formData.append("schoolId", "1");
    formData.append("userType", "Teacher");
    formData.append("isProfile", isProfile);
    if (profilePicture) {
      formData.append("profilePic", profilePicture, profilePicture.name);
    }

    try {
      if (isEdit) {
        await new Promise((resolve, reject) => {
          updateClassroom(
            { classroomId, classroomData: formData },
            { onSuccess: resolve, onError: reject }
          );
        });
        CustomMessage.success("Classroom updated successfully!");
        closeModal();
      } else {
        await new Promise((resolve, reject) => {
          createClassroom(formData, { onSuccess: resolve, onError: reject });
        });
        CustomMessage.success("Classroom created successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error while submitting classroom data:", error);
      // CustomMessage.error("Something went wrong. Please try again.");
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
      <div className="classroom-create">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <Form.Item
                name="classroomName"
                className="classroom-label"
                label={
                  <span className="flex items-center gap-1">
                    Classroom Name
                    <span className="text-danger"> *</span>
                  </span>
                }
                validateStatus={
                  error ? "error" : validationMessage ? "success" : ""
                }
                help={error || validationMessage}
              >
                <Input
                  placeholder="Blue-D"
                  onChange={(e) => setClassroomName(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                name="profilePicture"
                className="classroom-label"
                label="Profile Picture"
              >
                <div className="profile-image">
                  <ProfileImageComponent
                    fileList={fileList}
                    onChange={handleFileChange}
                    setIsProfile={setIsProfile}
                  />
                </div>
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <Form.Item
                name="capacity"
                className="classroom-label"
                label={
                  <span className="flex items-center gap-1">
                    Capacity
                    <span className="text-danger"> *</span>
                  </span>
                }
                // rules={[{ required: true, message: "Please input capacity!" }]}
              >
                <InputNumber
                  min={1}
                  max={30}
                  placeholder="13"
                  className="w-100"
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                name="ratio"
                className="classroom-label"
                label="Student : Teacher Ratio"
              >
                <InputNumber
                  min={1}
                  max={5}
                  placeholder="4"
                  className="w-100"
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            {/* Min Age Fields */}
            <div className="col-12 col-sm-6">
              <span className="d-block mb-2 classroom-label">Min Age</span>
              <div className="row">
                <div className="col-6">
                  <Form.Item name="minAgeYear" className="mb-0 classroom-label">
                    <InputNumber
                      min={0}
                      max={6}
                      placeholder="Year"
                      className="w-100"
                    />
                  </Form.Item>
                  <div className="text-center">
                    <span className="classroom-label-light">Year</span>
                  </div>
                </div>
                <div className="col-6">
                  <Form.Item name="minAgeMonth" className="mb-0">
                    <InputNumber
                      min={0}
                      max={11}
                      placeholder="Month"
                      className="w-100"
                    />
                  </Form.Item>
                  <div className="text-center">
                    <span className="classroom-label-light">Month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Max Age Fields */}
            <div className="col-12 col-sm-6">
              <label className="d-block mb-2 classroom-label">Max Age</label>
              <div className="row">
                <div className="col-6">
                  <Form.Item
                    name="maxAgeYear"
                    className="mb-0"
                    rules={[
                      {
                        validator: (_, value) =>
                          validateMinMaxAge(_, value, form),
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={6}
                      placeholder="Year"
                      className="w-100"
                    />
                  </Form.Item>
                  <div className="text-center">
                    <span className="classroom-label-light">Year</span>
                  </div>
                </div>
                <div className="col-6">
                  <Form.Item
                    name="maxAgeMonth"
                    className="mb-0"
                    rules={[
                      {
                        validator: (_, value) =>
                          validateMinMaxAge(_, value, form),
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={11}
                      placeholder="Month"
                      className="w-100"
                    />
                  </Form.Item>
                  <div className="text-center">
                    <span className="classroom-label-light">Month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div className="d-flex align-items-center">
                <span className="me-2">Active</span>
                <Form.Item
                  name="active"
                  valuePropName="checked"
                  className="mb-0 me-2 classroom-create-toggle-btn"
                >
                  <Switch />
                </Form.Item>
                <span className="text-muted">Inactive</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <ButtonComponent text={isEdit ? "Save" : "Add"} />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateClassroom;
