import React, { useEffect, useState } from "react";
import { Table, Empty } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const TableComponent = ({
  columns,
  dataSource = [],
  loading = false,
  className = "",
  moduleName = "",
  rowKey = "key",
  paginationSize = 10,
  tableSize = "middle",
  sizeChanger = false,
  showTotalProp = false,
  scrollY = false,
  scrollX = false,
  headerAlign = "left", // Added prop for header alignment
  emptyText = "No Data Available", // Added prop for custom empty state
  rowSelection, // New prop for row selection
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

  // Adjust header alignment
  const adjustedColumns = columns.map((col) => ({
    ...col,
    align: col.align || headerAlign, // Apply headerAlign if not explicitly set
  }));

  return (
    <div className={`bg-white border-radius rounded-lg ${className}`}>
      <Table
        columns={adjustedColumns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        scroll={{
          y: scrollY || "50vh", // Default to 60% viewport height
          x: scrollX || "100%", // Default to 100% width
        }}
        className="ant-table-sticky responsive-table custom-ant-table"
        size={tableSize}
        locale={{
          emptyText: <Empty description={emptyText} />, // Custom empty state
        }}
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
                  {`Showing ${startRecord}-${endRecord} of ${total} ${moduleName}`}
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
        rowSelection={rowSelection} // Conditionally apply rowSelection if passed
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      <style jsx>{`
        .table-container {
          padding: 16px;
        }
        @media (max-width: 768px) {
          .responsive-table {
            font-size: 12px;
          }
          .mr10 {
            margin-right: 5px;
          }
          .ml10 {
            margin-left: 5px;
          }
        }
        @media (max-width: 480px) {
          .responsive-table {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TableComponent;
