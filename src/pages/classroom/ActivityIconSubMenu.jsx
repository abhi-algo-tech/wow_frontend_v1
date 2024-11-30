import { Card } from "antd";
import React from "react";

const ActivitySubMenu = [
  { label: "Nap", Icon: "/wow_icons/png/Nap.png" },
  { label: "Bathroom", Icon: "/wow_icons/png/Bathroom.png" },
  { label: "Bottle", Icon: "/wow_icons/png/Bottle.png" },
  { label: "Meal", Icon: "/wow_icons/png/Meal.png" },
  { label: "Incident", Icon: "/wow_icons/png/Incident.png" },
  { label: "Photo / Video", Icon: "/wow_icons/png/photo_video.png" },
  { label: "Medication", Icon: "/wow_icons/png/Medication.png" },
  { label: "Notes", Icon: "/wow_icons/png/Notes.png" },
  { label: "Outdoor", Icon: "/wow_icons/png/Outdoor.png" },
  { label: "Learning", Icon: "/wow_icons/png/Learning.png" },
];

function ActivityIconSubMenu() {
  return (
    <Card>
      <div className="lable-16-600">Choose Activity</div>
      <div className="activity-submenu-grid mt16">
        {ActivitySubMenu.map((data, i) => (
          <div key={i} className="activity-submenu-icon">
            <div className="activity-submenu-icon-inner">
              <img
                className="activity-submenu-icon-size"
                src={data?.Icon}
                alt={data?.label}
              />
              <div className="label-14-500">{data?.label}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ActivityIconSubMenu;
