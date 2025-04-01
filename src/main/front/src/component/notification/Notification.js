import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import NotificationList from "./NotificationList";
import axios from "axios";
import { axiosPrivate } from "../axios/axios";
function Notification() {
  const auth = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const res = await axiosPrivate.get("notification");
      setNotifications(res.data);
    } catch (error) {
      console.error("");
    }
  };
  useEffect(() => {
    fetchNotifications();
    console.log("AuthContext:", auth);
  }, [auth]);
  return <NotificationList notifications={notifications} />;
}
export default Notification;
