import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function AttendanceBanner() {
  const [currentDate, setCurrentDate] = useState({
    month: "",
    day: "",
    weekday: "",
    time: "",
  });

  const [status, setStatus] = useState("idle");
  const [startTime, setStartTime] = useState("");
  const [awayTime, setAwayTime] = useState("");
  const { headers } = useContext(HttpHeadersContext);

  useEffect(() => {
    const updateDateAndTime = () => {
      const now = new Date();
      const weekdays = [
        "일요일", "월요일", "화요일", "수요일", "목요일",
        "금요일",
        "토요일",
      ];
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
              console.log("Latitude:", latitude, "Longitude:", longitude);
              try {
            
              const response = await axios.post("http://localhost:8080/clockIn",
                  {
                    latitude: latitude,
                    longitude: longitude,
                    headers : headers,
                  },
                  
              );
            alert(response.data);
            setStartTime(currentDate.time);
            setStatus("working");
          } catch (error) {
            alert(`출근 실패: ${error.response?.data || error.message}`);
          }
        },
        (error) => {
          alert("위치 정보를 가져오는데 실패했습니다.");
          console.error(error);
        }
      );
    } else {
      alert("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
    }
  };

  const handleAway = () => {
    alert("자리비움 처리되었습니다.");
    setAwayTime(currentDate.time);
    setStatus("away");
  };

  const handleReturn = () => {
    alert("복귀 처리되었습니다.");
    setStatus("working");
  };

  const handleClockOut = () => {
    alert("퇴근 처리되었습니다.");
    setStartTime("");
    setAwayTime("");
    setStatus("idle");
  };

  return (
    <div className="item bg_pm mt_lg">
      <div className="fs_md tc-w">
        {status === "idle" &&
          `오늘은 ${currentDate.month}월 ${currentDate.day}일 ${currentDate.weekday}이에요 :D`}
        {status === "working" && `근무중 ${startTime}~`}
        {status === "away" && `자리비움 중 ${awayTime}~`}
      </div>

      <div className="fs_lg tc-w">{currentDate.time}</div>

      <div className="btn-group">
        {status === "idle" && (
          <button
            className="btn btn-max btn-pl fs_lg mt_sm mb_sm"
            onClick={handleClockIn}
          >
            출근
          </button>
        )}
        {status === "working" && (
          <>
            <button
              className="btn btn-max btn-p02 fs_lg mt_sm mb_sm"
              onClick={handleAway}
            >
              자리비움
            </button>
            <button
              className="btn btn-max btn-p05 fs_lg mt_sm mb_sm"
              onClick={handleClockOut}
            >
              퇴근
            </button>
          </>
        )}
        {status === "away" && (
          <>
            <button
              className="btn btn-max btn-p04 fs_lg mt_sm mb_sm"
              onClick={handleReturn}
            >
              복귀
            </button>
            <button
              className="btn btn-max btn-p05 fs_lg mt_sm mb_sm"
              onClick={handleClockOut}
            >
              퇴근
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AttendanceBanner;