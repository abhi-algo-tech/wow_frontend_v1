"use client";

import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function ClassroomTable() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      const mockData = [
        {
          id: "1",
          name: "1-Blue-D",
          capacity: 13,
          fte: "82%",
          active: 10,
          upcoming: 2,
          present: 9,
          assigned: 3,
          presentCount: 3,
        },
        // Add more mock data here as needed
      ];
      setDataSource(mockData);
      setPagination((prev) => ({ ...prev, total: mockData.length }));
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "FTE",
      dataIndex: "fte",
      key: "fte",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Upcoming",
      dataIndex: "upcoming",
      key: "upcoming",
    },
    {
      title: "Present",
      dataIndex: "present",
      key: "present",
    },
    {
      title: "Assigned",
      dataIndex: "assigned",
      key: "assigned",
    },
    {
      title: "Present",
      dataIndex: "presentCount",
      key: "presentCount",
    },
  ];

  const startRecord = (pagination.current - 1) * pagination.pageSize + 1;
  const endRecord = Math.min(
    pagination.current * pagination.pageSize,
    pagination.total
  );

  const CustomPagination = () => (
    <div className="flex items-center justify-end w-full mt-4">
      <Pagination
        {...pagination}
        size="small"
        itemRender={(current, type, originalElement) => {
          if (type === "prev") {
            return (
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mr-2">
                <LeftOutlined className="text-xs" /> Previous
              </button>
            );
          }
          if (type === "next") {
            return (
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 ml-2">
                Next <RightOutlined className="text-xs" />
              </button>
            );
          }
          return originalElement;
        }}
        onChange={(page, pageSize) => {
          setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize: pageSize,
          }));
        }}
        className="[&_.ant-pagination-item-active]:bg-blue-500 [&_.ant-pagination-item-active]:border-blue-500 [&_.ant-pagination-item-active]:text-white"
      />
      <span className="ml-4 text-sm text-gray-600">
        {`Showing ${startRecord}-${endRecord} of ${pagination.total} Classrooms`}
      </span>
    </div>
  );

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
        scroll={{ x: true }}
        className="ant-table-sticky"
        size="middle"
        pagination={false}
      />
      <CustomPagination />
    </div>
  );
}
