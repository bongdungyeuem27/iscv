import { loadingEvent } from "./LoadingContainer";


const useLoading = () => {
  return {
    open: () => {
      loadingEvent.emit("set", true);
    },
    close: () => {
      loadingEvent.emit("set", false);
    },
  };
};

export default useLoading;
