import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const SessionContext = createContext();

// Custom hook to use session context
export const useSession = () => {
  return useContext(SessionContext);
};

// SessionProvider component to wrap around the app
export const SessionProvider = ({ children }) => {
  const [academyId, setAcademyId] = useState(
    sessionStorage.getItem("selectedAcademyID") || ""
  );
  const [academyLabel, setAcademyLabel] = useState(
    sessionStorage.getItem("selectedAcademyLabel") || ""
  );

  useEffect(() => {
    // Listen for changes in sessionStorage (Optional if you need to keep in sync)
    const handleStorageChange = () => {
      setAcademyId(sessionStorage.getItem("selectedAcademyID") || "");
      setAcademyLabel(sessionStorage.getItem("selectedAcademyLabel") || "");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setSessionData = (key, value) => {
    sessionStorage.setItem(key, value);
    if (key === "selectedAcademyID") setAcademyId(value);
    if (key === "selectedAcademyLabel") setAcademyLabel(value);
  };

  return (
    <SessionContext.Provider
      value={{ academyId, academyLabel, setSessionData }}
    >
      {children}
    </SessionContext.Provider>
  );
};
