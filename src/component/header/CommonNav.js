import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/common.css";
import useCount from "../notification/hooks/useCount";
import useSelectTitle from "./utils/useSelectTitle";
import { useEffect } from "react";
import BackButton from "./BackButton";
import NotificationIcon from "./NotificationIcon";

const CommonNav = (messages) => {
  const location = useLocation();
  const navigate = useNavigate();
  const count = useCount(messages);
  const isMainPage = location.pathname === "/" || location.pathname === "/home";
  const isVacationPage = location.pathname === "/vacation";
  const title = useSelectTitle(location);
  const handleListPage = () => {
    navigate("/vacationList");
  };
  useEffect(() => {}, [count]);

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
      {!isMainPage && <BackButton />}
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
        {title}
      </h4>
      {isVacationPage && (
        <h4
          style={{
            marginLeft: "10px",
            height: "60%",
            width: "auto",
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            position: "absolute",
            right: "40px",
            bottom: "10px",
          }}
          onClick={handleListPage}
        >
          신청내역
        </h4>
      )}
      <Link to={"/"}>
        <h4>홈</h4>
      </Link>
      <NotificationIcon count={count} />
    </nav>
  );
};

export default CommonNav;
