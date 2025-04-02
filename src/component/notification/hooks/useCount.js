import { useEffect, useState } from "react";
import { axiosPrivate } from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const useCount = (messages) => {
  const notificationId = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate(`/notification/${notificationId}`);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosPrivate.get("notification");
        console.log("📩 알림 리스트:", res.data);

        // isRead가 false인 알림만 필터링하여 개수 카운트
        const unreadNotifications = res.data.filter(
          (notification) => !notification.isRead
        );
        setCount(unreadNotifications.length);
      } catch (error) {
        console.error("❌ 알림을 가져오는 데 오류 발생:", error);
      }
    };

    fetchNotifications(); // 최초 한 번 실행
  }, [messages, navigate]); // ✅ 의존성 배열을 빈 배열([])로 설정하여 한 번만 실행

  return count;
};

export default useCount;
