import { useStore } from "../../../store";

const bootSubsceneManager = (eventState: any) => {
  const setBootSubscene = useStore.getState().setBootSubscene;

  const dispatchAction = (eventState: { event: string }) => {
    switch (eventState.event) {
      case "authorize_user_back":
      case "load_data_no_select":
        return {
          action: () => setBootSubscene("main_menu"),
        };
      case "authorize_user_select":
        return {
          action: () => setBootSubscene("authorize_user"),
        };
      case "load_data_select":
        return { action: () => setBootSubscene("load_data") };
    }
  };

  const { action } = { ...dispatchAction(eventState) };

  if (action) {
    action();
  }
};

export default bootSubsceneManager;