import React from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Progress,
  Table,
  Typography,
  Dropdown,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import CustomCircle from "../../components/CustomCircle";
import { IoIosMore } from "react-icons/io";

const { Text } = Typography;

const StaffAttendance = () => {
  // Table columns configuration
  const columns = [
    {
      title: (
        <div className="d-flex align-items-center">
          Date <span style={{ marginLeft: "4px" }}>↑↓</span>
        </div>
      ),
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Classroom",
      dataIndex: "classroom",
      key: "classroom",
    },
    {
      title: "Sign In",
      dataIndex: "signIn",
      key: "signIn",
    },
    {
      title: "By",
      dataIndex: "signInBy",
      key: "signInBy",
    },
    {
      title: "Sign Out",
      dataIndex: "signOut",
      key: "signOut",
    },
    {
      title: "By",
      dataIndex: "signOutBy",
      key: "signOutBy",
    },
    {
      title: "Attended Time",
      dataIndex: "attendedTime",
      key: "attendedTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                // onClick: () => handleEditModal(record.key),
                label: "Edit",
                className: "student-table-action-label",
              },
              {
                key: "delete",
                // onClick: () => handleDeleteModal(record.key, record.name),
                label: "Delete",
                className: "student-table-action-label",
              },
            ],
            onClick: ({ key }) => {
              if (key !== "delete") {
                //  onActionClick(key, record); // call directly for non-delete actions
              }
            },
          }}
          trigger={["click"]}
        >
          <IoIosMore className="pointer" />
        </Dropdown>
      ),
    },
  ];

  // Table data
  const data = [
    {
      key: "1",
      date: "Nov 13, 2024",
      classroom: "1-Blue-D",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "2",
      date: "Nov 12, 2024",
      classroom: "2-Yellow-C",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "3",
      date: "Nov 11, 2024",
      classroom: "3-Orange-D",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "4",
      date: "Nov 08, 2024",
      classroom: "4-Pink-C",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "3",
      date: "Nov 11, 2024",
      classroom: "3-Orange-D",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "4",
      date: "Nov 08, 2024",
      classroom: "4-Pink-C",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "3",
      date: "Nov 11, 2024",
      classroom: "3-Orange-D",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
    {
      key: "4",
      date: "Nov 08, 2024",
      classroom: "4-Pink-C",
      signIn: "09:15 AM",
      signInBy: "Spandana Marri",
      signOut: "01:30 PM",
      signOutBy: "Spandana Marri",
      attendedTime: "8 hours 15 minutes",
    },
  ];

  return (
    <div>
      <Card
        bordered={false}
        styles={{ body: { padding: 20, marginBottom: 20 } }}
      >
        <Row
          className="d-flex justify-content-between align-items-center"
          gutter={[20, 10]}
        >
          <Col span={6}>
            <Row className="d-flex justify-content-between align-items-center">
              <Col d-flex flex-column align-items-center>
                <div className="mr20" style={{ position: "relative" }}>
                  <Avatar size={120} src="/wow_images/staff.png" />
                  <div
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 20,
                      width: "16px",
                      height: "16px",
                      backgroundColor: "#52c41a",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </div>
              </Col>
              <Col className="text-center">
                <div className=".label-20-500  mb6">Natasha Shah</div>
                <div className="label-12-400 mb6">Lead Teacher</div>
                <div className="label-12-400">1-Blue-D</div>
              </Col>
            </Row>
          </Col>

          <Col span={6}>
            <Row className="d-flex justify-content-between align-items-center attendance-profile-card-attendance-day ">
              <Col className="mr20">
                <div className="mb15">
                  <img src={"/wow_icons/png/calendar_clock.png"} />
                </div>
                <Text className="label-16-500">Attended Days</Text>
              </Col>
              <Col>
                <CustomCircle number={3} color="#5978F7" />
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row className="d-flex justify-content-between align-items-center attendance-profile-card-attendance-day ">
              <Col className="mr20">
                <div className="mb15">
                  <img src={"/wow_icons/png/calendar_clock.png"} />
                </div>
                <Text className="label-16-500">Absent Days</Text>
              </Col>
              <Col>
                <CustomCircle number={1} color="#FF756E" />
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row className="d-flex justify-content-between align-items-center attendance-profile-card-attendance-day ">
              <Col className="mr20">
                <div className="mb15">
                  <img src={"/wow_icons/png/avg_pace.png"} />
                </div>
                <Text className="label-16-500">Total Hours</Text>
              </Col>
              <Col>
                <CustomCircle number={"25"} color="#6F8CFF" hours={true} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card>
        <div className="custom-scrollbar">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 300 }}

            // pagination={{
            //   total: 50,
            //   current: 2,
            //   pageSize: 10,
            //   showSizeChanger: false,
            //   itemRender: (_, type, originalElement) => {
            //     if (type === "prev") return <a>Previous</a>;
            //     if (type === "next") return <a>Next</a>;
            //     return originalElement;
            //   },
            // }}
          />
        </div>
      </Card>
    </div>
  );
};

export default StaffAttendance;
