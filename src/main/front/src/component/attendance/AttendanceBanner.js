import { useEffect, useState } from "react";
import axios from "axios";
import '../../css/attendance.css';

function AttendanceBanner() {
  const [currentDate, setCurrentDate] = useState({
    month: "",
    day: "",
    weekday: "",
    time: "",
  });

  const [status, setStatus] = useState("퇴근");
  const [startTime, setStartTime] = useState("");
  const [awayTime, setAwayTime] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("CL_access_token");

  const handleOutOfOfficePopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchWorkStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/workStatus", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setStatus(response.data || "퇴근");
      } catch (error) {
        console.error("근무 상태 조회 실패:", error.response?.data || error.message);
      }
    };

    fetchWorkStatus();

    const updateDateAndTime = () => {
      const now = new Date();
      const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekday = weekdays[now.getDay()];
      const time = now.toLocaleTimeString("ko-KR", { hour12: false });
      setCurrentDate({ month, day, weekday, time });
    };

    updateDateAndTime();
    const intervalId = setInterval(updateDateAndTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClockIn = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`클라이언트 위도: ${latitude}, 경도: ${longitude}`); // 로그 추가
          try {
            const response = await axios.post(
              "http://localhost:8080/clockIn",
              { latitude, longitude },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            alert(response.data);
            setStartTime(currentDate.time);
            setStatus("근무중");
          } catch (error) {
            console.error("출근 실패:", error.response?.data || error.message);
            alert(`출근 실패: ${JSON.stringify(error.response?.data || error.message)}`);
          }
        },
        (error) => {
          alert("위치 정보 로드 실패.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation 로드 실패.");
    }
  };

  const handleOutOfOffice = async (type) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/outOfOffice",
        { outOfOfficeType: type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data);
      setAwayTime(currentDate.time);
      setStatus("자리비움중");
      handleClosePopup();
    } catch (error) {
      console.error("자리비움 실패:", error.response?.data || error.message);
      alert(`자리비움 실패: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  const handleReturnToOffice = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post(
              "http://localhost:8080/returnToOffice",
              { latitude, longitude },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            alert(response.data);
            setStatus("근무중");
          } catch (error) {
            console.error("복귀 실패:", error.response?.data || error.message);
            alert(`복귀 실패: ${JSON.stringify(error.response?.data || error.message)}`);
          }
        },
        (error) => {
          alert("위치 정보 로드 실패.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation 로드 실패.");
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/clockOut",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data);
      setStatus("퇴근");
      setStartTime("");
      setAwayTime("");
    } catch (error) {
      console.error("퇴근 실패:", error.response?.data || error.message);
      alert(`퇴근 실패: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  return (
    <div className="item bg_pm mt_lg">
      <div className="fs_md tc-w">
        {(status === "퇴근")&& `오늘은 ${currentDate.month}월 ${currentDate.day}일 ${currentDate.weekday}이에요 :D`}
        {status === "근무중" && `근무 중 ${startTime}~`}
        {status === "자리비움중" && `자리비움 중 ${awayTime}~`}
      </div>

      <div className="fs_lg tc-w">{currentDate.time}</div>

      <div className="btn-group">
        {(status === "퇴근") && (
          <button className="btn btn-max btn-pl fs_lg mt_sm mb_sm" onClick={handleClockIn}>출근</button>
        )}
        {status === "근무중" && (
          <>
            <button className="btn btn-max btn-p04 fs_lg mt_sm mb_sm" onClick={handleOutOfOfficePopup}>자리비움</button>
            <button className="btn btn-max btn-p05 fs_lg mt_sm mb_sm" onClick={handleClockOut}>퇴근</button>
          </>
        )}
        {status === "자리비움중" && (
          <>
            <button className="btn btn-max btn-p04 fs_lg mt_sm mb_sm" onClick={handleReturnToOffice}>복귀</button>
            <button className="btn btn-max btn-p05 fs_lg mt_sm mb_sm" onClick={handleClockOut}>퇴근</button>
          </>
        )}
      </div>
      {/* 팝업창 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>자리비움 유형을 선택하세요</h3>
            <button onClick={() => handleOutOfOffice("휴식")}>휴식</button>
            <button onClick={() => handleOutOfOffice("식사")}>식사</button>
            <button onClick={() => handleOutOfOffice("기타")}>기타</button>
            <button onClick={handleClosePopup}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AttendanceBanner;