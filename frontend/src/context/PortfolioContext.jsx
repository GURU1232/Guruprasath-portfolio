import { createContext, useContext, useEffect, useState } from "react";
import * as staticData from "../data/portfolio";

const PortfolioContext = createContext({
  profile: staticData.profile,
  skills: staticData.skills,
  projects: staticData.projects,
  experience: staticData.experience,
  loading: false,
});

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    profile: staticData.profile,
    skills: staticData.skills,
    projects: staticData.projects,
    experience: staticData.experience,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchBackendData() {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${apiBase}/api/portfolio`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.profile) {
            setData({
              profile: json.profile,
              skills: json.skills || staticData.skills,
              projects: json.projects || staticData.projects,
              experience: json.experience || staticData.experience,
              loading: false,
            });
          }
        }
      } catch (err) {
        console.log("Using local portfolio fallback:", err.message);
      } finally {
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    }
    fetchBackendData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
