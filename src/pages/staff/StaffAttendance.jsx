import React from "react";
import { Card, Avatar, Row, Col, Progress, Table, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import CustomCircle from "../../components/CustomCircle";

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
      render: () => <EllipsisOutlined style={{ cursor: "pointer" }} />,
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
  ];

  return (
    <div>
      <Card
        bordered={false}
        style={{ borderRadius: "16px", marginBottom: "20px" }}
        styles={{ body: { padding: 20 } }}
      >
        <Row className="d-flex justify-content-evenly align-items-center">
          <Col>
            <Row className="d-flex justify-content-evenly align-items-center">
              <Col>
                <div className="mr20" style={{ position: "relative" }}>
                  <Avatar
                    size={120}
                    src="/placeholder.svg?height=64&width=64"
                  />
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
              <Col>
                <Text className="student-profile-name mb6">Natasha Shah</Text>
                <Text type="secondary">1-Blue-D</Text>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row className="d-flex justify-content-evenly align-items-center attendance-profile-card-attendance-day ">
              <Col className="mr20">
                <div className="mb15">
                  <Avatar width={38} src={"fas"} />
                </div>
                <Text className="attendance-profile-card-attendance-day-lable">
                  Attended Days
                </Text>
              </Col>
              <Col>
                <Progress
                  type="circle"
                  percent={75}
                  width={80}
                  format={() => "3"}
                  strokeColor="#52c41a"
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="d-flex justify-content-evenly align-items-center attendance-profile-card-attendance-day ">
              <Col className="mr20">
                <div className="mb15">
                  <Avatar width={38} src={"fas"} />
                </div>
                <Text className="attendance-profile-card-attendance-day-lable">
                  Absent Days
                </Text>
              </Col>
              <Col>
                {/* <Progress
                  type="circle"
                  percent={75}
                  width={80}
                  format={() => "1"}
                  strokeColor="#FF756E"
                /> */}
                <CustomCircle />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="d-flex justify-content-evenly align-items-center attendance-profile-card-attendance-day ">
              <Col className="mr20">
                <div className="mb15">
                  <Avatar width={38} src={"fas"} />
                </div>
                <Text className="attendance-profile-card-attendance-day-lable">
                  Total Hours
                </Text>
              </Col>
              <Col>
                <Progress
                  type="circle"
                  percent={75}
                  width={80}
                  format={() => "75h"}
                  strokeColor="#52c41a"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: 50,
          current: 2,
          pageSize: 10,
          showSizeChanger: false,
          itemRender: (_, type, originalElement) => {
            if (type === "prev") return <a>Previous</a>;
            if (type === "next") return <a>Next</a>;
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default StaffAttendance;
