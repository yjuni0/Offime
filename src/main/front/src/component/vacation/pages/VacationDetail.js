import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequestStatus from "../utils/requestStatus"; // RequestStatus 컴포넌트 import
import VacationActionButton from "../component/VacationActionButton";
import calculateDays from "../utils/calculator";
import getStatusColor from "../utils/getStatusColor";
import {
  fetchVacationDetail,
  cancelVacation,
  approveVacation,
  rejectVacation,
} from "../api/apiVacation";

const VacationDetail = () => {
  const { vacationId } = useParams();
  const name = localStorage.getItem("name");
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
    try {
      const res = await cancelVacation(vacationId);
      if (res.status === 200) {
        alert("취소되었습니다.");
        navigate("/vacation");
      }
    } catch (error) {
      alert(error.message || "휴가 취소 실패");
    }
  };

  const handleApprove = async () => {
    try {
      const res = await approveVacation(vacationId);
      console.log("휴가 승인 응답:", res);
      alert("승인되었습니다.");
      navigate("/vacation");
    } catch (error) {
      alert(error.message || "휴가 승인 실패 ");
    }
  };

  const handleReject = async () => {
    try {
      const res = await rejectVacation(vacationId);
      alert("반려되었습니다.");
      navigate("/vacation");
    } catch (error) {
      alert(error.message || "휴가 반려 실패 ");
    }
  };

  return (
    <>
      <RequestStatus response={response} />
      {isAdmin && (
        <div className="item bg_n0 mt_md">
          <h4>휴가 신청자</h4>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>{name}</p>
        </div>
      )}
      <p
        style={{
          fontSize: "12px",
          marginTop: "20px",
          position: "relative",
          textAlign: "right",
          marginRight: "10px",
        }}
      >
        신청일 : {response.createdDate}
      </p>
      <div className="bg_n0 item">
        <p> {response.type}</p>
        <p>
          {response.startDate} ~ {response.endDate}
        </p>
        <div
          className="item"
          style={{
            backgroundColor: "#F2F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4
            style={{
              color: getStatusColor(response.status),
              fontSize: "28px",
              right: "10px",
            }}
          >
            {calculateDays(response.startDate, response.endDate)}
            <span style={{ fontSize: "20px" }}>일</span>
          </h4>
        </div>
      </div>

      <div className="item bg_n0 mt_md">
        <p style={{ borderBottom: "1px solid black" }}>사유 </p>
        <p style={{ width: "430px" }}>
          {response.reason}
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </p>
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
