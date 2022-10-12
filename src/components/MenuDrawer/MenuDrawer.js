import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

import "./MenuDrawer.css";

const menuItems = [
  { label: "Dashboard", path: "", icon: <HomeIcon fontSize="large" /> },
  {
    label: "Sensors",
    path: "sensor",
    icon: <SensorOccupiedIcon fontSize="large" />,
  },
];

const MenuDrawer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuClass = cx("menu", { open: isOpen });
  return (
    <div className={menuClass}>
      <div className="menu-hamburger">
        <MenuIcon
          htmlColor="white"
          fontSize="large"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div>
        {menuItems.map((item) => (
          <div
            className="menu__item"
            key={item.path}
            onClick={() => {
              navigate(`/${item.path}`);
              setIsOpen(false);
            }}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuDrawer;
