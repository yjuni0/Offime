import HeaderNav from "../header/CommonNav";
import "../../css/common.css";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../axios/axios";
const NotificationList = ({ notifications }) => {
  const navigate = useNavigate();

  // 알림 읽기 함수
  const readNotification = async (id, type, typeId) => {
    try {
      const res = await axiosPrivate.patch(`/notification/${id}`);
      if (res.status === 200) {
        // 알림을 읽었으면 해당 알림의 상세 페이지로 이동
        navigate(`/${type}/${typeId}`);
      }
    } catch (error) {
      console.error(
        "휴가 반려 오류 발생:",
        error.response?.data?.message || "알 수 없는 오류"
      );
      throw error.response?.data || { message: "서버 오류 발생" }; // ✅ 에러 응답 반환
    }
  };

  return (
    <div>
      {notifications.length === 0 ? (
        <p>알림이 없습니다.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="bg_n0 item bg_pm"
              style={{
                position: "relative",
                marginTop: "10px",
                opacity: notification.isRead ? 0.5 : 1, // 읽었으면 opacity 0.5
              }}
              onClick={() =>
                readNotification(
                  notification.id,
                  notification.type,
                  notification.typeId
                )
              } // 클릭 시 알림 읽음 처리
            >
              <p className="fs_md">{notification.message}</p>
              <p style={{ marginTop: "10px" }}>{notification.createdDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
