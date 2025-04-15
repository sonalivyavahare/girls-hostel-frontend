import React, { createContext, useContext, useState } from "react";

const HostelThemeContext = createContext();

export const HostelThemeProvider = ({ children }) => {
    const [menuBarColor, setMenuBarColor] = useState("#1483ae"); // default color

    return (
        <HostelThemeContext.Provider value={{ menuBarColor, setMenuBarColor }}>
            {children}
        </HostelThemeContext.Provider>
    );
};

export const useHostelTheme = () => useContext(HostelThemeContext);
