import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PendingExpensesCount.css";

const PendingExpensesCount = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await fetch("/api/expenses/pending/count", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // "Bearer " 접두사 추가
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPendingCount(data.count);
        } else {
          setError("대기중인 경비 수를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("오류 발생: " + error.message);
      }
    };

    fetchPendingCount();
  }, [navigate]);

  const handleContainerClick = () => {
    navigate("/expenseList"); // 클릭 시 list 페이지로 이동
  };

  return (
    <>
      <div
        className="pending-count-container"
        onClick={handleContainerClick} // 클릭 이벤트 핸들러 추가
        style={{ cursor: "pointer" }} // 커서 스타일 변경
      >
        <h2>경비 관리</h2>
        <p className="pending-count">{pendingCount} 건</p>
      </div>
    </>
  );
};

export default PendingExpensesCount;
