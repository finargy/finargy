import {UIState} from "./";

type UIActionType = {type: "UI - ToggleSidebar"};

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - ToggleSidebar":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    default:
      return state;
  }
};
