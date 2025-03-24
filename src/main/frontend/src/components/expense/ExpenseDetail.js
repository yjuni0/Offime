import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExpenseDetail.css";

const ExpenseDetail = () => {
  const [expense, setExpense] = useState(null); // expense 상태 관리
  const { id } = useParams(); // URL에서 id 파라미터 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenseDetail = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`/api/expenses/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExpense(data); // 데이터를 상태에 저장
        } else {
          console.error("Error fetching expense details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    fetchExpenseDetail();
  }, [id, navigate]); // id가 변경될 때마다 fetch 실행

  // 데이터를 아직 로드하지 않았으면 로딩 표시
  if (!expense) {
    return <div>Loading...</div>;
  }

  // 로드한 데이터를 화면에 출력
  return (
    <div className="expense-detail-container">
      <h2 className="expense-detail-title">{expense.title}</h2>
      <div className="expense-detail-info">
        <div>
          <strong>날짜: </strong>
          {expense.date}
        </div>
        <div>
          <strong>카테고리: </strong>
          {expense.category}
        </div>
        <div>
          <strong>내용: </strong>
          {expense.content}
        </div>
        <div>
          <strong>금액: </strong>
          {expense.amount} 원
        </div>
      </div>

      {expense.photoUrls && expense.photoUrls.length > 0 && (
        <div className="expense-detail-images">
          <h3>사진</h3>
          <div className="expense-detail-image-container">
            {expense.photoUrls.map((url, index) => (
              <img
                key={index}
                className="expense-detail-image"
                src={url}
                alt={`Expense image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;
