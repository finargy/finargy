import {createContext} from "react";

interface ContextProps {
  isSidebarOpen: boolean;

  // Methods
  toggleSidebar: () => void;
}

export const UIContext = createContext({} as ContextProps);
