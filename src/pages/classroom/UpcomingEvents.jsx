import React from "react";
import { Card, Row, Col, Avatar, Tooltip } from "antd";
import { RiCake2Fill } from "react-icons/ri"; // Cake icon
import { FaStar, FaFlask, FaTrophy, FaRegUser, FaReact } from "react-icons/fa"; // Star, Flask, Trophy, User, React icons
import { UserOutlined } from "@ant-design/icons";

const events = [
  {
    date: { day: "01", month: "Sep" },
    title: "3 Students Outgoing",
    icon: "/classroom_icons/png/Arrow-up-circle-P.png",
    avatars: [
      "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
    ],
    color: "#E6E6FA", // Light lavender color for event theme
  },
  {
    date: { day: "08", month: "Sep" },
    title: "2 Students Incoming",
    icon: "/classroom_icons/png/Arrow-down-circle-O.png",
    avatars: ["https://api.dicebear.com/7.x/miniavs/svg?seed=4"],
    color: "#FFE4B5", // Light yellow for event theme
  },
  {
    date: { day: "12", month: "Sep" },
    title: "4 Students Incoming",
    icon: "/classroom_icons/png/Arrow-down-circle-G.png",
    avatars: [
      "https://api.dicebear.com/7.x/miniavs/svg?seed=6", // Avatar from DiceBear
      "https://api.dicebear.com/7.x/miniavs/svg?seed=7", // Avatar from DiceBear
      "", // Empty, will use a fallback icon
    ],
    color: "#E0FFFF", // Light cyan for event theme
  },
  // {
  //   date: { day: "14", month: "Sep" },
  //   title: "Junior Sports Spectacular",
  //   icon: <FaTrophy style={{ color: "#FFA500", fontSize: "20px" }} />, // Trophy icon
  //   avatars: [],
  //   color: "#E6E6FA", // Light lavender color for event theme
  // },
  // {
  //   date: { day: "20", month: "Sep" },
  //   title: "React Workshop",
  //   icon: <FaReact style={{ color: "#61DAFB", fontSize: "20px" }} />, // React icon
  //   avatars: [
  //     "https://api.dicebear.com/7.x/miniavs/svg?seed=8", // Avatar from DiceBear
  //     "https://via.placeholder.com/48x48?text=JS", // Custom placeholder avatar
  //   ],
  //   color: "#FFDDC1", // Light peach color for event theme
  // },
  // {
  //   date: { day: "25", month: "Sep" },
  //   title: "Coding Hackathon",
  //   icon: <FaTrophy style={{ color: "#FFD700", fontSize: "20px" }} />, // Trophy icon for coding event
  //   avatars: [
  //     "https://api.dicebear.com/7.x/miniavs/svg?seed=9", // Avatar from DiceBear
  //     "", // Empty, will use a fallback icon
  //   ],
  //   color: "#D1C4E9", // Light purple for event theme
  // },
];

const EventItem = ({ event }) => (
  <Row className="event-item mt9" align="middle" wrap={true}>
    {/* Date Column */}
    <Col span={4} className="event-date">
      <div className="event-month">{event.date.month}</div>
      <div className="event-day">{event.date.day}</div>
    </Col>

    {/* Event Details Column */}
    <Col span={14} className="event-details">
      <div className="event-title">{event.title}</div>
      <Avatar className="upcomming-status-avtar" src={event.icon} />
    </Col>

    {/* Avatars Column */}
    <Col span={6} className="event-avatars">
      {event.avatars.length >= 1 ? (
        <Avatar.Group
          max={{
            count: 2,
            style: { color: "#f56a00", backgroundColor: "#fde3cf" },
          }}
        >
          {event.avatars.map((avatar, index) =>
            avatar ? (
              <Avatar key={index} src={avatar} />
            ) : (
              <Tooltip key={index} title="Icon Avatar" placement="top">
                <Avatar style={{ backgroundColor: "#87d068" }}>
                  <FaRegUser />
                </Avatar>
              </Tooltip>
            )
          )}

          <Avatar style={{ backgroundColor: "#1677ff" }} icon={<FaReact />} />
        </Avatar.Group>
      ) : (
        <Avatar
          style={{ backgroundColor: "#1677ff" }}
          icon={<UserOutlined />}
        />
      )}
    </Col>
  </Row>
);

export default function UpcomingEvents({ CardTitle }) {
  return (
    <Card className="event-card">
      <div>
        <span className="event-title">Upcoming Moves</span>
      </div>
      {events.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </Card>
  );
}
