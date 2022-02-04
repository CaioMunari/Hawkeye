import React, { useEffect } from "react";
import { toast } from "react-toastify";

const OfflineNotification = () => {
  const toastId = React.useRef(null);

  useEffect(() => {
    let intervalId;
    intervalId = setTimeout(() => {
      toastId.current = toast.info(`Você está usando essa aplicação offline!`, {
        toastId: "appUpdateAvailable", // Prevent duplicate toasts
        // closeOnClick: true,
        position: "top-right",
        autoClose: false, // Prevents toast from auto closing
      });
    }, 2000);

    return () => {
      clearTimeout(intervalId);
      toast.dismiss(toastId.current);
    };
  }, []);
  return <></>;
};

export default OfflineNotification;
