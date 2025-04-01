import { useNavigate } from "react-router-dom";
import BackArrow from "./image/backArrow.png";
import notificationIC from "./image/notification.png";
const HeaderNav = (props) => {
  const navigate = useNavigate();
  return (
    <nav
      className="bg_n0 item bg_pm mt_md"
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h4
        style={{
          marginLeft: "10px",
          height: "60%",
          width: "auto",
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        {props.title}
      </h4>
      <button
        className="notification-icon"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: "10px",
        }}
        onClick={() => navigate("/notification")}
      >
        <img
          src={notificationIC}
          alt="알림"
          style={{ height: "50%", width: "auto" }}
        />
      </button>
    </nav>
  );
};
export default HeaderNav;
