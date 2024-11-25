import React, { useState } from "react";
import { Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const TableComponent = ({
  columns,
  dataSource = [],
  loading = false,
  className = "",
  rowKey = "key",
  paginationSize = 10,
  tableSize = "middle",
  sizeChanger = false,
  showTotalProp = false,
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: paginationSize,
    total: dataSource?.length || 0, // Fallback to 0 if dataSource is empty or undefined
  });

  // Calculate the range of records being displayed
  const startRecord =
    pagination.total > 0
      ? (pagination.current - 1) * pagination.pageSize + 1
      : 1;

  const endRecord =
    pagination.total > 0
      ? Math.min(pagination.current * pagination.pageSize, pagination.total)
      : paginationSize;

  return (
    <div className={`bg-white border-radius rounded-lg  ${className}`}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        scroll={{ x: true }}
        className="ant-table-sticky"
        size={tableSize}
        pagination={{
          showSizeChanger: sizeChanger,
          //   showQuickJumper: true,
          showTotal: showTotalProp
            ? (total) => {
                return (
                  <span
                    style={{
                      fontWeight: 500,
                      color: "#573353",
                      fontSize: "14px", // Adjust font size for better readability
                    }}
                  >
                    {`Showing ${startRecord}-${endRecord} of ${total} Classrooms`}
                  </span>
                );
              }
            : false,

          position: ["bottomCenter"],
          itemRender: (current, type, originalElement) => {
            if (type === "prev") {
              return (
                <a className="mr10">
                  <LeftOutlined /> Previous
                </a>
              );
            }
            if (type === "next") {
              return (
                <a className="ml10">
                  Next <RightOutlined />
                </a>
              );
            }
            return originalElement;
          },
          onChange: (page, pageSize) => {
            setPagination((prev) => ({
              ...prev,
              current: page,
              pageSize: pageSize,
              total: dataSource.length,
            }));
          },
        }}
      />
    </div>
  );
};

export default TableComponent;
