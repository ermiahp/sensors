import { useEffect, useState } from "react";
import StatusCard from "../StatusCard/StatusCard";
import SensorList from "../SensorList/SensorList";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ComputerIcon from "@mui/icons-material/Computer";
import { Line } from "react-chartjs-2";
import randomColor from "randomcolor";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Home.css";
import axios from "axios";
import { getStatsUrl } from "../../api/apiRoutesV1";
import { toShortFormat } from "../../utils/helper";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Home = () => {
  const [temps, setTemps] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  const statsItems = [
    { label: "TOTAL SENSORS", number: 0, icon: <StorefrontIcon /> },
    { label: "OPEN ALERTS", number: 0, icon: <LocalOfferIcon /> },
    { label: "TOTAL CUSTOMERS", number: 0, icon: <ComputerIcon /> },
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      title: {
        display: false,
      },
    },
  };
  useEffect(() => {
    axios.get(getStatsUrl()).then((res) => {
      if (res.status === 200) {
        setTemps(res.data.results);
        setChartOptions({
          data: {
            labels: temps[0]?.stats.map((stat) => toShortFormat(stat.time)),
            datasets: temps.map((temp) => {
              return {
                label: temp.device_id,
                data: temp.stats.map((stats) => stats.temp),
                backgroundColor: randomColor(),
                borderColor: randomColor(),
              };
            }),
          },
        });
      }
    });
  }, []);
  return (
    <div>
      <div className="stats-cards">
        {statsItems.map((stats) => (
          <StatusCard
            key={stats.label}
            label={stats.label}
            number={stats.number}
            icon={stats.icon}
          />
        ))}
      </div>
      <div>
        <h3>SENSOR TEMPERATURES</h3>
        <Line options={options} data={chartOptions.data} />
      </div>
      <SensorList />
    </div>
  );
};
export default Home;
