import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Switch, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent";
import {
  useClassroomById,
  useCreateClassroom,
  useUpdateClassroom,
  useValidateClassroom,
} from "../../hooks/useClassroom";
import ProfileImageComponent from "../../components/ProfileImageComponent";

function CreateClassroom({ CardTitle, classroomId, closeModal }) {
  const [form] = Form.useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [fileList, setFileList] = useState([]);
  const { mutate: createClassroom } = useCreateClassroom();
  const { mutate: updateClassroom } = useUpdateClassroom();
  const { data: classroomData } = useClassroomById(classroomId);
  const [classroomName, setClassroomName] = useState("");
  const { error, message, validate } = useValidateClassroom({
    name: classroomName,
    id: classroomId,
  });
  const isEdit = Boolean(classroomId); // Check if editing

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
    if (newFileList && newFileList.length > 0) {
      setProfilePicture(newFileList[0].originFileObj); // Save the actual file for submission
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
            name: "Profile Picture",
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
    if (profilePicture) {
      formData.append("profilePic", profilePicture, profilePicture.name);
    }

    try {
      // Ensure both mutate calls return promises
      if (isEdit) {
        await new Promise((resolve, reject) => {
          updateClassroom(
            { classroomId, classroomData: formData },
            { onSuccess: resolve, onError: reject }
          );
        });
      } else {
        await new Promise((resolve, reject) => {
          createClassroom(formData, { onSuccess: resolve, onError: reject });
        });
      }
      closeModal(); // Close modal on success
    } catch (error) {
      console.error("Error while submitting classroom data:", error);
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
                validateStatus={error ? "error" : message ? "success" : ""}
                help={error || message}
                // rules={[
                //   { required: true, message: "Please input classroom name!" },
                // ]}
              >
                <Input
                  placeholder="Blue-D"
                  onChange={(e) => {
                    setClassroomName(e.target.value);
                    if (e.target.value.trim() !== "") {
                      validate(e.target.value.trim(), classroomId);
                    }
                  }}
                />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                name="profilePicture"
                className="classroom-label"
                label="Profile Picture"
              >
                {/* <Upload
                  listType="picture"
                  maxCount={1}
                  onChange={handleFileChange}
                  fileList={fileList}
                  beforeUpload={() => false}
                > */}
                <div className="profile-image">
                  <ProfileImageComponent
                    fileList={fileList}
                    onChange={handleFileChange}
                  />
                </div>
                {/* <Upload listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload> */}
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
                <InputNumber min={1} placeholder="13" className="w-100" />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                name="ratio"
                className="classroom-label"
                label="Student : Teacher Ratio"
              >
                <InputNumber min={1} placeholder="4" className="w-100" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            {/* <div className="col-6">
              <Form.Item label="Min Age">
                <div className="d-flex gap-2">
                  <Form.Item name="minAgeYear" noStyle>
                    <InputNumber min={0} placeholder="Year" />
                  </Form.Item>
                  <Form.Item name="minAgeMonth" noStyle>
                    <InputNumber min={0} max={11} placeholder="Month" />
                  </Form.Item>
                </div>
              </Form.Item>
            </div> */}
            <div className="col-12 col-sm-6">
              <span className="d-block mb-2 classroom-label">Min Age</span>
              <div className="row">
                <div className="col-6">
                  <Form.Item name="minAgeYear" className="mb-0 classroom-label">
                    <InputNumber min={0} placeholder="Year" className="w-100" />
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

            {/* <div className="col-6">
              <Form.Item label="Max Age">
                <div className="d-flex gap-2">
                  <Form.Item name="maxAgeYear" noStyle>
                    <InputNumber min={0} placeholder="Year" />
                  </Form.Item>

                  <Form.Item name="maxAgeMonth" noStyle>
                    <InputNumber min={0} max={11} placeholder="Month" />
                  </Form.Item>
                </div>
              </Form.Item>
            </div> */}
            <div className="col-12 col-sm-6">
              <label className="d-block mb-2 classroom-label">Max Age</label>
              <div className="row">
                <div className="col-6">
                  <Form.Item name="maxAgeYear" className="mb-0">
                    <InputNumber min={0} placeholder="Year" className="w-100" />
                  </Form.Item>
                  <div className="text-center">
                    <span className="classroom-label-light">Year</span>
                  </div>
                </div>
                <div className="col-6">
                  <Form.Item name="maxAgeMonth" className="mb-0">
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
            <ButtonComponent text={isEdit ? "Save" : "Add"} gradient />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateClassroom;
