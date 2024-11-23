import { Space } from "antd";
import {
  FaCamera,
  FaFileAlt,
  FaPills,
  FaExclamationTriangle,
  FaUtensils,
} from "react-icons/fa";

export default function Component() {
  const indicators = [
    {
      icon: (
        <img
          src="/classroom_icons/png/no-photo.png"
          alt="No Photo"
          className="student-activity-type-icons"
        />
      ),
      label: "No Photo",
    },
    {
      icon: (
        <img
          src="/classroom_icons/png/Notes.png"
          alt="No Photo"
          className="student-activity-type-icons"
        />
      ),
      label: "Notes",
    },
    {
      icon: (
        <img
          src="/classroom_icons/png/Medication.png"
          alt="No Photo"
          className="student-activity-type-icons"
        />
      ),
      label: "Medication",
    },
    {
      icon: (
        <img
          src="/classroom_icons/png/Allergies.png"
          alt="No Photo"
          className="student-activity-type-icons"
        />
      ),
      label: "Allergies",
    },
    {
      icon: (
        <img
          src="/classroom_icons/png/Dietary-Restrictions.png"
          alt="No Photo"
          className="student-activity-type-icons"
        />
      ),
      label: "Dietary Restrictions",
    },
  ];

  return (
    <Space size={16}>
      {indicators.map((indicator, index) => (
        <div key={index} className="d-flex align-items-center">
          {indicator.icon}
          <span className="student-activity-type-label">{indicator.label}</span>
        </div>
      ))}
    </Space>
  );
}
