import { useEffect, useState } from "react";
import { axiosPrivate } from "../axios/axios";

const useCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosPrivate.get("notification");
        console.log("알림 리스트:", res.data);
        setCount(res.data.length); // 알림 개수 업데이트
      } catch (error) {
        console.error("알림을 가져오는 데 오류가 발생했습니다:", error);
      }
    };
    fetchNotifications();
  }, []);

  return count; // count를 반환
};

export default useCount;
