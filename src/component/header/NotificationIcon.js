import { useNavigate } from "react-router-dom";
import notificationIC from "./image/notification.png";
const NotificationIcon = ({ count }) => {
  const navigate = useNavigate();

  return (
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
      {count > 0 && (
        <p
          style={{
            position: "absolute",
            top: "3px",
            right: "-5px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {count}
        </p>
      )}
      <img
        src={notificationIC}
        alt="알림"
        style={{ height: "50%", width: "auto" }}
      />
    </button>
  );
};
export default NotificationIcon;
