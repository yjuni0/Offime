import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";

const PendingExpensesCount = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/");
          return;
        }

        // 대기중인 경비 개수 요청
        const pendingResponse = await fetch(
          "http://localhost:8080/api/expenses/pending/count",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json();
          setPendingCount(pendingData.count);
        } else {
          setError("대기중인 경비 수를 가져오는 데 실패했습니다.");
        }

        // 거절된 경비 개수 요청
        const rejectedResponse = await fetch(
          "http://localhost:8080/api/expenses/rejected/count",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (rejectedResponse.ok) {
          const rejectedData = await rejectedResponse.json();
          setRejectedCount(rejectedData.count);
        } else {
          setError("거절된 경비 수를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("오류 발생: " + error.message);
      }
    };

    fetchCounts();
  }, [navigate]);

  const handleContainerClick = () => {
    navigate("/expenseList"); // 클릭 시 list 페이지로 이동
  };

  return (
    <>
      <div
        className="bg_n0 item bg_pm flex "
        onClick={handleContainerClick} // 클릭 이벤트 핸들러 추가
        style={{ cursor: "pointer" }} // 커서 스타일 변경
      >
        <h3 className="ml_xlg">경비 관리</h3>
        <h3 className="tc-pm ml_xlg  ">{pendingCount}</h3>
        <h3 className="tc-p5 ml_xlg">{rejectedCount}</h3>
      </div>
    </>
  );
};

export default PendingExpensesCount;
