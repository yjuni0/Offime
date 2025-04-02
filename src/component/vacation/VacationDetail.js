import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../axios/axios";
import CommonNav from "../header/CommonNav"; // CommonNav 컴포넌트 import
import RequestStatus from "./features/requestStatus"; // RequestStatus 컴포넌트 import

const VacationDetail = () => {
  const { vacationId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null); // 상태 초기화

  useEffect(() => {
    const fetchVacationDetail = async () => {
      try {
        const response = await axiosPrivate.get(`/vacation/${vacationId}`);
        console.log("휴가 상세 정보:", response.data);
        setResponse(response.data); // 상태 업데이트
      } catch (error) {
        console.error("휴가 상세 정보를 가져오는 중 오류 발생:", error);
        navigate("/home"); // 홈으로 리다이렉트
      }
    };
    fetchVacationDetail(); // 함수 호출
  }, [vacationId, navigate]); // 의존성 배열에 vacationId와 navigate 추가

  // 상태가 로딩 중일 때는 렌더링을 지연시킴
  if (!response) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <CommonNav title={"신청 휴가"} />
      <RequestStatus response={response} />
      <div className="bg_n0 item" style={{ marginTop: "20px" }}>
        <p>{response.status}</p>
        <p>{response.type}</p>
        <p>{response.startDate}</p>
        <p>{response.endDate}</p>
      </div>
      <button
        className="btn btn-max btn-e"
        style={{
          width: "460px",
          marginTop: "20px",
          position: "fixed",
          bottom: "20px", // 버튼을 화면 하단에 고정
        }}
      >
        취소
      </button>
    </>
  );
};

export default VacationDetail;
