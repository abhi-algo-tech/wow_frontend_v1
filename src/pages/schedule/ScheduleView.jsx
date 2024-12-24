"use client";

import React from "react";
import { Collapse, Progress, Space, Avatar, Card } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { getInitialsTitleWithColor } from "../../services/common";
import CardGrid from "../../components/card/CardGrid";

export default function ScheduleView() {
  const images = [
    "/classroom_icons/png/Aadhira.png",
    "/classroom_icons/png/Aarav.png",
    "/classroom_icons/png/Aarjav.png",
  ];
  const schedulingData = [
    {
      id: "1",
      name: "1-Blue-D",
      expectedStudents: 12,
      requiredStaff: 3,
      scheduledStaff: 2,
      type: "class",
      scheduling: [
        { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
        { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
        { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
        { timeRange: "5:00 PM - 5:30 PM", typeOf: "overRatio" },
      ],
      staff: [
        {
          id: 1,
          name: "Jessica Rhodes",
          duration: { scheduled: 55, available: 43 },
          type: "staff",
          avatar: "/classroom_icons/png/Aadhira.png",
          scheduling: [
            { timeRange: "9:00 AM - 1:00 PM", typeOf: "inRatio" },
            { timeRange: "1:00 PM - 1:30 PM", typeOf: "underRatio" },
            { timeRange: "1:30 PM - 2:00 PM", typeOf: "inRatio" },
          ],
        },
        {
          id: 2,
          name: "Ana Biwalkar",
          duration: { scheduled: 55, available: 43 },
          type: "staff",
          avatar: "/classroom_icons/png/Aarav.png",
          scheduling: [
            { timeRange: "11:00 AM - 1:00 PM", typeOf: "inRatio" },
            { timeRange: "1:00 PM - 2:30 PM", typeOf: "underRatio" },
            { timeRange: "2:30 PM - 5:00 PM", typeOf: "inRatio" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "1-Pink-D",
      expectedStudents: 12,
      requiredStaff: 3,
      scheduledStaff: 2,
      type: "class",
      scheduling: [
        { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
        { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
        { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
        { timeRange: "5:00 PM - 5:30 PM", typeOf: "overRatio" },
      ],
      staff: [
        {
          id: 1,
          name: "Jessica Rhodes",
          duration: { scheduled: 55, available: 43 },
          type: "staff",
          avatar: "/classroom_icons/png/Aadhira.png",
          scheduling: [
            { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
            { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
            { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
          ],
        },
        {
          id: 2,
          name: "Ana Biwalkar",
          duration: { scheduled: 55, available: 43 },
          type: "staff",
          avatar: "/classroom_icons/png/Aarav.png",
          scheduling: [
            { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
            { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
            { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
          ],
        },
        {
          id: 3,
          name: "Lana Rhodes",
          duration: { scheduled: 55, available: 43 },
          type: "staff",
          avatar: "/classroom_icons/png/Aadhira.png",
          scheduling: [
            { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
            { timeRange: "1:00 PM - 2:00 PM", typeOf: "underRatio" },
            { timeRange: "2:00 PM - 4:10 PM", typeOf: "inRatio" },
          ],
        },
      ],
    },
  ];
  const ClassHeader = ({ data }) => {
    const { name } = data;
    const { initials, backgroundColor } = getInitialsTitleWithColor(name);

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <Avatar
              size={24}
              style={{
                backgroundColor: backgroundColor,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {initials}
            </Avatar>
            <span className="label-20-600">{name}</span>
          </div>
          <div className="d-flex justify-content-between gap16">
            <div className="d-flex align-items-center gap10">
              <div
                style={{
                  width: 9,
                  height: 9,
                  background: "#F38D8D",
                  borderRadius: 9999,
                }}
              />
              <div className="label-12-500">Under Ratio/Break/Absent</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: 9,
                  height: 9,
                  background: "#ACF3AA",
                  borderRadius: 9999,
                }}
              />
              <div className="label-12-500">In Ratio/Present</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: 9,
                  height: 9,
                  background: "#5978F7",
                  borderRadius: 9999,
                }}
              />
              <div className="label-12-500">Over Ratio</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ClassTeacherList = ({ data }) => {
    const classScheduling = data?.scheduling;

    return (
      <>
        {/* <div>
          <div className="d-flex justify-content-between gap16">
            <div
              className="d-flex gap16 align-items-center"
              style={{ width: "20%" }}
            >
              <div className="label-14-500 mx-3">Class Schedule</div>
              <div
                style={{
                  width: 0,
                  height: 50,
                  border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
                }}
              ></div>
            </div>
            <CardGrid
              scheduleType="classScheduling"
              scheduling={classScheduling}
            />
          </div>
          <div
            className="mt12 mb12"
            style={{
              height: 0,
              border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
            }}
          ></div>
        </div> */}
        <div>
          <div className="d-flex ">
            <div className="d-flex gap16 ">
              <div className="d-flex justify-content-between align-items-center gap12">
                <div className=" d-flex teacher-name-container align-items-start width152">
                  <div className="label-14-500 ">Class Schedule</div>
                </div>
              </div>
              <div
                style={{
                  width: 0,
                  height: 50,
                  border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
                }}
              ></div>
            </div>
            <CardGrid
              scheduleType="classScheduling"
              scheduling={classScheduling}
            />
          </div>
          <div
            className="mt12 mb12"
            style={{
              height: 0,
              border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
            }}
          ></div>
        </div>
        {data?.staff?.map((staffdata) => (
          <div>
            <div className="d-flex  ">
              <div className="d-flex  ">
                <div className="d-flex align-items-center gap16">
                  <Avatar
                    src={staffdata.avatar}
                    alt={staffdata.name}
                    size={24}
                  />
                  <div className="teacher-name-container">
                    <div className="label-14-500">{staffdata.name}</div>
                    <div className="teacher-time-container">
                      <div className="teacher-toggle-history">
                        <Avatar
                          size={20}
                          src={"/wow_icons/png/history_toggle_off.png"}
                        />
                        <div className="label-12-500 mr8">
                          {staffdata?.duration?.available}h
                        </div>
                      </div>
                      <div className="teacher-more-time">
                        <img
                          className="width20 height18"
                          src={"/wow_icons/png/more_time.png"}
                        />
                        <div className="label-12-500 mr8">
                          {staffdata?.duration?.scheduled}h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: 0,
                    height: 50,
                    border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
                  }}
                ></div>
              </div>
              <CardGrid
                scheduleType="staffSchedule"
                scheduling={staffdata?.scheduling}
              />
            </div>
            <div
              className="mt12 mb12"
              style={{
                height: 0,
                border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
              }}
            ></div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Card styles={{ body: { padding: 8 } }}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          {schedulingData?.map((data) => (
            <Collapse
              key={data?.id}
              className="schedule-actor-card"
              collapsible="header"
              defaultActiveKey={["1"]}
              items={[
                {
                  key: data?.id,
                  label: <ClassHeader data={data} />,
                  children: <ClassTeacherList data={data} />,
                },
              ]}
            />
          ))}
        </Space>
      </Card>
    </>
  );
}
