"use client";

import { useState } from "react";
import { Avatar, Table } from "antd";
import {
  CheckCircleOutlined,
  WarningOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
// import Image from "next/image";
const data = [
  {
    id: "1",
    name: "1-Blue-D",
    status: {
      "Mon 27": false,
      "Tue 28": true,
      "Wed 29": false,
      "Thu 30": true,
      "Fri 31": true,
    },
    teachers: [
      {
        id: "1",
        name: "Ana Biwalkar",
        avatar: "/placeholder.svg?height=32&width=32",
        availability: 45,
        scheduled: 55,
        timeSlots: {
          "Mon 27": ["07:00 AM - 05:00 PM"],
          "Tue 28": ["07:00 AM - 05:00 PM"],
          "Thu 30": ["07:00 AM - 05:00 PM"],
          "Fri 31": ["07:00 AM - 05:00 PM"],
        },
      },
      {
        id: "2",
        name: "Lana Rhodes",
        avatar: "/placeholder.svg?height=32&width=32",
        availability: 55,
        scheduled: 45,
        timeSlots: {
          "Mon 27": ["07:00 AM - 05:00 PM"],
          "Tue 28": ["07:00 AM - 05:00 PM"],
          "Thu 30": ["07:00 AM - 05:00 PM"],
          "Fri 31": ["07:00 AM - 05:00 PM"],
        },
      },
    ],
  },
  {
    id: "2",
    name: "2-Yellow-C",
    status: {
      "Mon 27": true,
      "Tue 28": false,
      "Wed 29": true,
      "Thu 30": true,
      "Fri 31": false,
    },
    teachers: [
      {
        id: "3",
        name: "Chaitanya Desai",
        avatar: "/placeholder.svg?height=32&width=32",
        availability: 45,
        scheduled: 55,
        timeSlots: {
          "Mon 27": ["07:00 AM - 05:00 PM"],
          "Tue 28": ["07:00 AM - 05:00 PM"],
          "Wed 29": ["07:00 AM - 05:00 PM"],
          "Thu 30": ["07:00 AM - 05:00 PM"],
          "Fri 31": ["07:00 AM - 05:00 PM"],
        },
      },
      {
        id: "4",
        name: "Spandana Shah",
        avatar: "/placeholder.svg?height=32&width=32",
        availability: 45,
        scheduled: 55,
        timeSlots: {
          "Mon 27": ["07:00 AM - 05:00 PM"],
          "Tue 28": ["07:00 AM - 05:00 PM"],
          "Wed 29": ["07:00 AM - 05:00 PM"],
          "Thu 30": ["07:00 AM - 05:00 PM"],
          "Fri 31": ["07:00 AM - 05:00 PM"],
        },
      },
    ],
  },
];

const days = ["Mon 27", "Tue 28", "Wed 29", "Thu 30", "Fri 31"];

export default function ScheduleTable() {
  const [expandedRows, setExpandedRows] = useState([]);

  const columns = [
    {
      title: () => (
        <div className="flex items-center gap-2">
          <span>Collapse All</span>
          <select className="border rounded px-2 py-1">
            <option>Select Classroom</option>
          </select>
        </div>
      ),
      align: "start",
      dataIndex: "name",
      key: "name",
      render: (name, record) => {
        const isExpanded = expandedRows.includes(record.id);
        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (isExpanded) {
                setExpandedRows(expandedRows.filter((id) => id !== record.id));
              } else {
                setExpandedRows([...expandedRows, record.id]);
              }
            }}
          >
            {isExpanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
            {name}
          </div>
        );
      },
    },
    ...days.map((day) => ({
      title: day,
      dataIndex: ["status", day],
      key: day,
      align: "center",
      render: (available, record) => {
        const isExpanded = expandedRows.includes(record.id);
        return (
          <div>
            <div className="flex justify-center mb-2">
              {available ? (
                <CheckCircleOutlined className="text-green-500 text-lg" />
              ) : (
                <WarningOutlined className="text-red-500 text-lg" />
              )}
            </div>
            {isExpanded &&
              record.teachers.map((teacher) => (
                <div key={teacher.id} className="mb-2">
                  {teacher.timeSlots[day]?.map((slot, index) => (
                    <div
                      key={index}
                      className="text-xs bg-gray-50 rounded p-1 text-center border border-gray-200"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        );
      },
    })),
  ];

  const expandedRowRender = (record) => {
    return (
      <div className="pl-8">
        {record.teachers.map((teacher) => (
          <div key={teacher.id} className="flex items-center gap-4 py-2">
            <Avatar
              src={teacher.avatar}
              alt={teacher.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{teacher.name}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                {teacher.availability}%
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                {teacher.scheduled}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      expandable={{
        expandedRowRender,
        expandedRowKeys: expandedRows,
        expandIcon: () => null,
      }}
      className="schedule-table"
    />
  );
}
