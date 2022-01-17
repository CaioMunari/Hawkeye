import moment from "moment";
import { useState, useEffect, createContext, useContext } from "react";
import { api } from "../services/api";
import { getLastCheckin } from "../services/auth";
import { routes } from "../services/routes";
import { getDeviceUsagePayload } from "../utils/payload";
import useInterval from "./useInterval";

export const SyncContext = createContext(null);

export const SyncProvider = ({ children }) => {
  const [sync, setSync] = useState(false);
  const [hours, setHours] = useState(1);

  let lastCheckin = getLastCheckin();
  let lastCheckinDate = moment(lastCheckin);
  useEffect(() => {
    if (!lastCheckin) return;
    if (lastCheckin) {
      setSync(true);
    }
    // eslint-disable-next-line
  }, [sync]);

  useInterval(
    () => {
      syncDeviceUse();
    },
    sync === true ? 60 * 60 * 1000 : null
  );

  const syncDeviceUse = async () => {
    lastCheckin = getLastCheckin();
    lastCheckinDate = moment(lastCheckin);
    if (!moment().isSame(lastCheckinDate, "day")) {
      return false;
    }
    const payload = getDeviceUsagePayload(hours);
    const { data: response } = await api.post(routes.APISaveUsage(), payload);
    if (response.status === 1) {
      setHours(hours + 1);
    }
  };

  return (
    <SyncContext.Provider value={{ sync, setSync }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  return context;
};
