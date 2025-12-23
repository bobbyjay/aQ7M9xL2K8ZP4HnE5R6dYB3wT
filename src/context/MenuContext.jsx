import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [showMenuBar, setShowMenuBar] = useState(false);

  return (
    <MenuContext.Provider value={{ showMenuBar, setShowMenuBar }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
