import React, { useEffect, useState } from "react";
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
  scrollY = false,
  scrollX = false,
}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: paginationSize,
    total: dataSource.length || 0,
  });

  // Update pagination total whenever dataSource changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: dataSource.length,
    }));
  }, [dataSource.length]);

  // Calculate the range of records being displayed
  const startRecord =
    pagination.total > 0
      ? (pagination.current - 1) * pagination.pageSize + 1
      : 0;

  const endRecord =
    pagination.total > 0
      ? Math.min(pagination.current * pagination.pageSize, pagination.total)
      : 0;

  return (
    <div className={`bg-white border-radius rounded-lg ${className}`}>
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
          showTotal: showTotalProp
            ? (total) => (
                <span
                  style={{
                    fontWeight: 500,
                    color: "#573353",
                    fontSize: "14px",
                  }}
                >
                  {`Showing ${startRecord}-${endRecord} of ${total} Classrooms`}
                </span>
              )
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
            }));
          },
        }}
      />
    </div>
  );
};

export default TableComponent;
