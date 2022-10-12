import Avatar from "../Avatar/Avatar";
import LandscapeIcon from "@mui/icons-material/Landscape";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <LandscapeIcon />
      <div className="header__user">
        <div className="header__options">
          <h3>JANE DOE</h3>
          <h4>Account Settings</h4>
        </div>
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
