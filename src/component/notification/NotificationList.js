import { useState } from "react";
import HeaderNav from "../header/CommonNav";
import "../../css/common.css";
import { Link } from "react-router-dom";
const NotificationList = ({ notifications }) => {
  return (
    <div>
      <HeaderNav title={"알림 메시지"} />
      {notifications.length === 0 ? (
        <p>알림이 없습니다.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <Link
              to={`/${notification.type}/${notification.typeId}`}
              key={notification.id}
            >
              <li
                className="bg_n0 item bg_pm"
                style={{ position: "relative", marginTop: "10px" }}
              >
                <p className="fs_md">{notification.message}</p>
                <p style={{ marginTop: "10px" }}>{notification.createdDate}</p>
                <p
                  style={{
                    position: "absolute",
                    right: "20px",
                    bottom: "20px",
                  }}
                >
                  ({notification.isRead ? "읽음" : "안 읽음"})
                </p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
export default NotificationList;
