import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExpenseDetail.css";
import BackPage from "../BackPage";

// 금액 형식 변환 함수
const formatAmount = (amount) => {
  if (!amount) return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ExpenseDetail = () => {
  const [expense, setExpense] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

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
          setExpense(data);
        } else {
          setError("데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("오류 발생: " + error.message);
      }
    };

    fetchExpenseDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`/api/expenses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          navigate("/list");
        } else {
          console.error("Error deleting expense:", response.status);
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/update/${id}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!expense) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <BackPage />
      <div className="expense-detail-container">
        <h2 className="expense-detail-title">{expense.title}</h2>
        <div className="expense-detail-info">
          <div>
            <strong>날짜: </strong>
            {new Date(expense.expenseDate).toLocaleDateString()}
          </div>
          <div>
            <strong>카테고리: </strong>
            {expense.category}
          </div>
          <div>
            <strong>내용: </strong> {expense.content}
          </div>
          <div>
            <strong>금액: </strong> {formatAmount(expense.amount)} 원
          </div>
        </div>

        {expense.imageUrls && expense.imageUrls.length > 0 && (
          <div className="expense-detail-images">
            <h3>사진</h3>
            <div className="expense-detail-image-container">
              {expense.imageUrls.map((url, index) => (
                <img
                  key={index}
                  className="expense-detail-image"
                  src={url}
                  alt={`Expense image ${index + 1}`}
                  onClick={() => setSelectedImage(url)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div className="image-modal-content">
              <img src={selectedImage} alt="Expanded view" />
            </div>
          </div>
        )}

        <div className="expense-detail-buttons">
          <button className="edit-button" onClick={handleEdit}>
            수정
          </button>

          {role === "ADMIN" && (
            <button className="delete-button" onClick={handleDelete}>
              삭제
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseDetail;
