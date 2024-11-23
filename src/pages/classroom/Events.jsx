import { Avatar, Card, Col, Row } from "antd";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const dates = [13, 14, 15, 16, 17, 18, 19];

const events = [
  {
    date: { day: 17, month: "Nov" },
    title: "Erica's Birthday",
    icon: "/classroom_icons/png/Ericas-Birthday.png",
    color: "rgb(147, 155, 255)",
  },
  {
    date: { day: 26, month: "Nov" },
    title: "Thanksgiving Party",
    icon: "/classroom_icons/png/Thanksgiving Party.png",
    color: "rgb(255, 171, 124)",
  },
  {
    date: { day: 30, month: "Nov" },
    title: "Parent Teacher Conference",
    icon: "/classroom_icons/png/Parent-Teacher-Conference.png",
    color: "rgb(134, 229, 166)",
  },
];

const EventItem = ({ event }) => (
  <Row className="event-item" align="middle" wrap={true}>
    {/* Date Column */}
    <Col span={4} className="event-date">
      <div className="event-month">{event.date.month}</div>
      <div className="event-day">{event.date.day}</div>
    </Col>

    {/* Event Details Column */}
    <Col span={16} className="event-details">
      <div className="event-title">{event.title}</div>
    </Col>

    {/* Avatars Column */}
    <Col span={4} className="event-avatars">
      <Avatar src={event.icon} />
    </Col>
  </Row>
);
export default function Events() {
  const weekRef = useRef(null);

  const scrollLeft = () => {
    weekRef.current.scrollBy({ left: -50, behavior: "smooth" });
  };

  const scrollRight = () => {
    weekRef.current.scrollBy({ left: 50, behavior: "smooth" });
  };

  return (
    <Card className="event-card">
      <div>
        <span className="event-title">Events</span>
      </div>
      {/* Week Navigation */}
      <div className="d-flex align-items-center justify-content-between mt10">
        <button onClick={scrollLeft} className="btn btn-light rounded-circle">
          <FaChevronLeft className="text-muted" />
        </button>

        <div className="d-flex week-scroll gap-1" ref={weekRef}>
          {weekDays.map((day, index) => (
            <div key={day + index} className="text-center snap-item">
              <div className="text-muted small">{day}</div>
              <div
                className={`rounded-circle date-circle ${
                  dates[index] === 17 ? "selected-date" : ""
                }`}
              >
                {dates[index]}
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="btn btn-light rounded-circle">
          <FaChevronRight className="text-muted" />
        </button>
      </div>

      {events.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </Card>
  );
}
