import { useNavigate } from "react-router-dom";
import BackArrow from "./image/backArrow.png";
import notificationIC from "./image/notification.png";
<<<<<<< HEAD
import useCount from "../notification/useCount";

const HeaderNav = (props) => {
  const count = useCount();

=======
const HeaderNav = (props) => {
>>>>>>> 4b2c3ec93060f2f4fdf9c609a163c566cb3b1a9f
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
<<<<<<< HEAD
        {count > 0 && (
          <p
            style={{
              position: "absolute",
              top: " 3px",
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
=======
>>>>>>> 4b2c3ec93060f2f4fdf9c609a163c566cb3b1a9f
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
