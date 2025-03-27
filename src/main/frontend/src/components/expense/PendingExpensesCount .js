import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PendingExpensesCount.css"; // 스타일 파일 필요
import BackPage from "../BackPage";

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

        console.log("Token:", token); // 토큰 확인

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <BackPage />
      <div className="pending-count-container">
        <h2>대기중인 경비 수</h2>
        <p className="pending-count">{pendingCount} 건</p>
      </div>
    </>
  );
};

export default PendingExpensesCount;
