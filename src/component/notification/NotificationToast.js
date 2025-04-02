import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useCount from "./hooks/useCount";
const NotificationToast = ({ messages }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook
  useCount(messages);
  useEffect(() => {
    messages.forEach((message) => {
      toast.info(`📢 ${message}`, {
        onClick: () => navigate("/notification"),
      });
    });
  }, [messages]);

  return null;
};

export default NotificationToast;
