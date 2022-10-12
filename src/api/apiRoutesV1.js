import { serverUrl } from "./server";

export const addSensorUrl = () => `${serverUrl}/sensor`;
export const getSensorsUrl = ({ sensorId = false, page = false } = {}) =>
  `${serverUrl}/sensor${page ? "?page=" + page : ""}${
    sensorId ? "/" + sensorId : ""
  }`;
export const getStatsUrl = () => `${serverUrl}/sensor/stats`;
