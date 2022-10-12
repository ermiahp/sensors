import { useEffect, useState } from "react";
import { Divider, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import "./Sensor.css";
import { addSensorUrl, getSensorsUrl } from "../../api/apiRoutesV1";

const Sensor = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { sensorId } = state ?? { sensorId: null };
  const [title, setTitle] = useState("New Sensor");
  const [edit, setEdit] = useState(false);
  const [sensor, setSensor] = useState({
    device_id: "",
    customer: null,
    location: "",
    min_temp_limit: null,
    monitor_min_temp: false,
    max_temp_limit: null,
    monitor_max_temp: false,
  });
  const [error, setError] = useState(null);

  const validateInputs = () => {
    return true;
  };

  useEffect(() => {
    const getSensor = () => {
      axios.get(getSensorsUrl({ sensorId })).then((res) => {
        if (res.status === 200) {
          setSensor(res.data.result);
        }
      });
    };
    if (sensorId) {
      setEdit(true);
      setTitle(`Edit Sensor - ${sensorId}`);
      getSensor();
    } else {
      setEdit(false);
    }
  }, [sensorId]);

  const addSensor = () => {
    if (validateInputs()) {
      axios.post(addSensorUrl(), sensor).then((res) => {
        console.log(res);
        console.log(res.status === 201);
        if (res.status === 201) {
          navigate("/");
        }
      });
    }
  };

  const updateSensor = () => {
    if (validateInputs()) {
      axios.put(getSensorsUrl({ sensorId }), sensor).then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="add-sensor">
      <div className="add-sensor__details">
        <h2>{title}</h2>
        <Divider />
        {edit ? (
          <h1>{sensor.device_id}</h1>
        ) : (
          <input
            placeholder="Sensor ID"
            onChange={(e) => setSensor({ ...sensor, id: e.target.value ?? "" })}
            value={sensor.id}
            disabled
          />
        )}
        <input
          placeholder="Location"
          onChange={(e) =>
            setSensor({ ...sensor, location: e.target.value ?? "" })
          }
          value={sensor.location}
        />
        <select
          onChange={(e) =>
            setSensor({ ...sensor, customer: e.target.value ?? "" })
          }
          value={sensor.customer}
        >
          <option selected disabled>
            Customer
          </option>
          <option value={"customer-1"}>customer-1</option>
        </select>
      </div>
      <div className="add-sensor__alerts">
        <h2>Alerts</h2>
        <Divider />
        <input
          placeholder="Min Temp. Threshold"
          onChange={(e) =>
            setSensor({ ...sensor, min_temp_limit: e.target.value ?? "" })
          }
          value={sensor.min_temp_limit}
        />
        <FormControlLabel
          label="Monitor Min Temperature"
          control={
            <Checkbox
              checked={sensor.monitor_min_temp}
              onChange={(e) =>
                setSensor({
                  ...sensor,
                  monitor_min_temp: e.target.checked ?? "",
                })
              }
            />
          }
        />
        <input
          placeholder="Max Temp. Threshold"
          onChange={(e) =>
            setSensor({ ...sensor, max_temp_limit: e.target.value ?? "" })
          }
          value={sensor.max_temp_limit}
        />
        <FormControlLabel
          label="Monitor Max Temperature"
          control={
            <Checkbox
              checked={sensor.monitor_max_temp}
              onChange={(e) =>
                setSensor({
                  ...sensor,
                  monitor_max_temp: e.target.checked ?? "",
                })
              }
            />
          }
        />
      </div>

      <div className="add-sensor-actions">
        {edit ? (
          <button onClick={updateSensor}>Update Sensor</button>
        ) : (
          <button onClick={addSensor}>Add Sensor</button>
        )}
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
};

export default Sensor;
