import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Custom hook to get the active key and active ID from the current route
const useNavigate = () => {
  const [activeKey, setActiveKey] = useState("");
  const [activeId, setActiveId] = useState(null); // To hold the active ID
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // Extract the active key from the first part of the path
    const normalizedKey =
      currentPath.split("/")[1]?.split("-")[0] || "dashboard";
    setActiveKey(normalizedKey);

    // Extract the active ID from the last part of the path (if exists)
    const pathParts = currentPath.split("/");
    const id = pathParts[pathParts.length - 1]; // Last part of the path
    if (!isNaN(id)) {
      // Ensure it's a valid number
      setActiveId(id);
    } else {
      setActiveId(null); // If no valid ID, reset it
    }
  }, [location.pathname]);

  return { activeKey, activeId }; // Return both activeKey and activeId
};

export default useNavigate;
