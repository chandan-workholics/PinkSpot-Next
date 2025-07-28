"use client";
import { createContext, useContext, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [footerSelectedCity, setFooterSelectedCity] = useState(null);

  return (
    <CityContext.Provider value={{ footerSelectedCity, setFooterSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);