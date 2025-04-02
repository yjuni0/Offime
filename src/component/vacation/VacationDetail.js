import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequestStatus from "./utils/requestStatus"; // RequestStatus 컴포넌트 import
import VacationActionButton from "./VacationActionButton";
import {
  fetchVacationDetail,
  cancelVacation,
  approveVacation,
  rejectVacation,
} from "./api/apiVacation";
const VacationDetail = () => {
  const { vacationId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const isAdmin = localStorage.getItem("role") === "ADMIN"; // ✅ 관리자 여부 상태 추가
  console.log("isAdmin:", isAdmin);
  useEffect(() => {
    const getVacationDetail = async () => {
      try {
        const res = await fetchVacationDetail(vacationId);
        console.log("휴가 상세 정보:", res);
        setResponse(res);
      } catch (error) {
        console.error("휴가 상세 정보를 가져오는 중 오류 발생:", error);
        navigate("/home");
      }
    };
    getVacationDetail();
  }, [vacationId, navigate]);

  if (!response) {
    return <p>로딩 중...</p>;
  }

  const handleCancel = async () => {
    await cancelVacation(vacationId);
    navigate("/vacation"); // 취소 후 목록 페이지로 이동
  };

  const handleApprove = async () => {
    await approveVacation(vacationId);
    navigate("/vacation");
  };

  const handleReject = async () => {
    await rejectVacation(vacationId);
    navigate("/vacation");
  };

  return (
    <>
      <RequestStatus response={response} />
      <div className="bg_n0 item" style={{ marginTop: "20px" }}>
        <p>{response.status}</p>
        <p>{response.type}</p>
        <p>{response.startDate}</p>
        <p>{response.endDate}</p>
      </div>

      {/* ✅ 버튼 컴포넌트 적용 */}
      <VacationActionButton
        isAdmin={isAdmin}
        onCancel={handleCancel}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
};

export default VacationDetail;
