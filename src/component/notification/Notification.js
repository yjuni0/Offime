import { useEffect, useState } from "react";
import NotificationList from "./NotificationList";
import { axiosPrivate } from "../axios/axios";
function Notification() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosPrivate.get("notification");
        console.log("알림 리스트:", res.data);
        setNotifications(res.data);
      } catch (error) {
        console.error("알림 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchNotifications();
  }, []); // auth 의존성 제거

  return <NotificationList notifications={notifications} />;
}
export default Notification;
