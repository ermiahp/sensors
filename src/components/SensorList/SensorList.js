import SettingsIcon from "@mui/icons-material/Settings";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSensorsUrl } from "../../api/apiRoutesV1";
import { toShortFormat } from "../../utils/helper";
import "./SensorList.css";

const SensorList = () => {
  const navigate = useNavigate();
  const [sensors, setSensors] = useState([]);
  const [paging, setPaging] = useState({});
  useEffect(() => {
    axios.get(getSensorsUrl()).then((res) => {
      if (res.status === 200) {
        setSensors(res.data.results);
        setPaging(res.data.paging);
      }
    });
  }, []);

  const handleChange = (event, value) => {
    axios.get(getSensorsUrl({ page: value })).then((res) => {
      if (res.status === 200) {
        setSensors(res.data.results);
        setPaging(res.data.paging);
      }
    });
  };

  return (
    <div>
      <div className="sensor-list__header">
        <h2>Sensor List</h2>
        <div className="sensor-list__icon">
          <SettingsIcon onClick={() => navigate("/sensor")} />
        </div>
      </div>
      <div className="sensor-list">
        {sensors.map((sensor, index) => (
          <div
            className={`sensor ${index % 2 ? "odd" : ""}`}
            key={sensor.device_id}
          >
            <span className="sensor__id">{sensor.device_id}</span>
            <span className="sensor__online">
              <span>{toShortFormat(sensor.last_online ?? "-")}</span>
              <span>Last Online</span>
            </span>
            <span className="sensor__temp">
              <span>{sensor.last_temp ?? "No data"}</span>
              {sensor.last_temp ||
                (sensor.last_temp === 0 && <span>Temp</span>)}
            </span>
            <span className="sensor__location">
              <span>{sensor.location ? sensor.location : "No data"}</span>
              {sensor.location && <span>Location</span>}
            </span>
            <button
              className="sensor__option"
              onClick={() =>
                navigate("/sensor", { state: { sensorId: sensor.device_id } })
              }
            >
              Options
            </button>
            <button className="sensor__detail">Details</button>
          </div>
        ))}
      </div>
      <div className="pagaination">
        <Pagination
          count={paging?.pages?.length}
          variant="outlined"
          shape="rounded"
          hideNextButton
          hidePrevButton
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SensorList;
