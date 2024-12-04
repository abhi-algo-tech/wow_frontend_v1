import React from "react";
import { Table, Typography } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const { Text } = Typography;

// Sample data
const data = [
  {
    key: "1",
    name: "1-Blue-D",
    teachers: [
      {
        key: "1-1",
        name: "Ana Biwalkar",
        avatar: "/placeholder.svg?height=32&width=32",
        hours: {
          planned: 45,
          actual: 55,
        },
        schedule: {
          mon: {
            time: "07:00 AM - 05:00 PM",
            status: "warning",
          },
          tue: {
            time: "07:00 AM - 05:00 PM",
            status: "success",
          },
          wed: {
            time: "07:00 AM - 05:00 PM",
            status: "warning",
          },
          thu: {
            time: "07:00 AM - 05:00 PM",
            status: "success",
          },
          fri: {
            time: "07:00 AM - 05:00 PM",
            status: "success",
          },
        },
      },
      // Add more teachers here
    ],
  },
];

const columns = [
  {
    title: (
      <div className="flex items-center">
        <span className="mr-2">Collapse All</span>
        <CaretDownOutlined />
      </div>
    ),
    dataIndex: "name",
    key: "name",
    align: "left",
    render: (text) => (
      <div className="flex items-center">
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: "Mon 27",
    dataIndex: "mon",
    key: "mon",
    align: "center",
    render: (_, record) => <Text>{record.teachers[0].schedule.mon.time}</Text>,
  },
  {
    title: "Tue 28",
    dataIndex: "tue",
    key: "tue",
    align: "center",
    render: (_, record) => <Text>{record.teachers[0].schedule.tue.time}</Text>,
  },
  {
    title: "Wed 29",
    dataIndex: "wed",
    key: "wed",
    align: "center",
    render: (_, record) => <Text>{record.teachers[0].schedule.wed.time}</Text>,
  },
  {
    title: "Thu 30",
    dataIndex: "thu",
    key: "thu",
    align: "center",
    render: (_, record) => <Text>{record.teachers[0].schedule.thu.time}</Text>,
  },
  {
    title: "Fri 31",
    dataIndex: "fri",
    key: "fri",
    align: "center",
    render: (_, record) => <Text>{record.teachers[0].schedule.fri.time}</Text>,
  },
];

const expandedRowRender = (record) => {
  return (
    <div>
      {record.teachers.map((teacher) => (
        <div key={teacher.key} style={{ marginBottom: "10px" }}>
          <Text strong>{teacher.name}</Text>
          <div className="grid grid-cols-5 gap-4 mt-2">
            <Text>{teacher.schedule.mon.time}</Text>
            <Text>{teacher.schedule.tue.time}</Text>
            <Text>{teacher.schedule.wed.time}</Text>
            <Text>{teacher.schedule.thu.time}</Text>
            <Text>{teacher.schedule.fri.time}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

const ScheduleTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => record.teachers.length > 0,
      }}
      pagination={false}
    />
  );
};

export default ScheduleTable;
