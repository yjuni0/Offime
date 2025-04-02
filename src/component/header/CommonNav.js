import { useLocation } from "react-router-dom";
import "../../css/common.css";
import useCount from "../notification/hooks/useCount";
import useSelectTitle from "./utils/useSelectTitle";
import { useEffect } from "react";
import BackButton from "./BackButton";
import NotificationIcon from "./NotificationIcon";

const CommonNav = (messages) => {
  const location = useLocation();
  const count = useCount(messages);
  const isMainPage = location.pathname === "/" || location.pathname === "/home";
  const title = useSelectTitle(location);

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
      <NotificationIcon count={count} />
    </nav>
  );
};

export default CommonNav;
