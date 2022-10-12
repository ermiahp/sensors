import "./StatusCard.css";
const StatusCard = ({ label, number, icon }) => {
  return (
    <div className="card">
      <div className="card__data">
        <h3>{label}</h3>
        <p>{number}</p>
      </div>
      {icon}
    </div>
  );
};

export default StatusCard;
