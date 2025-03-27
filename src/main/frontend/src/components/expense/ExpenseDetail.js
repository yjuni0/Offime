import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExpenseDetail.css";
import BackPage from "../BackPage";
import axios from "axios";

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

  // 이미지 URL 처리 함수
  const getImageUrl = (url) => {
    const backendUrl = "http://localhost:8080";

    if (!url) return ""; // URL이 없으면 빈 문자열 반환

    // 중복된 "/images/" 제거
    const normalizedUrl = url.replace(/^\/images\/images\//, "/images/");

    if (normalizedUrl.startsWith("/images/")) {
      return `${backendUrl}${normalizedUrl}`;
    }
    return url;
  };

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

  const handleStatusChange = async (status) => {
    if (role !== "ADMIN") {
      alert("이 작업을 수행할 권한이 없습니다.");
      return;
    }

    const action = status === "ACCEPTED" ? "승인" : "거절"; // "ACCEPTED"로 수정

    if (window.confirm(`이 경비를 ${action}하시겠습니까?`)) {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `/api/expenses/${id}/status?status=${status}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            try {
              const updatedExpense = await response.json();
              setExpense(updatedExpense);
              navigate("/list");
            } catch (jsonError) {
              console.error("Error parsing JSON:", jsonError);
              setError("서버 응답을 처리하는 중 오류가 발생했습니다.");
            }
          } else {
            console.error("Error: Response is not JSON");
            setError("서버 응답 형식이 올바르지 않습니다.");
          }
        } else {
          try {
            const errorData = await response.json();
            console.error("Error updating expense status:", errorData);
            setError(
              errorData.message || `상태 업데이트 실패: ${response.status}`
            );
          } catch (parseError) {
            console.error("Error parsing error response:", parseError);
            setError(`상태 업데이트 실패: ${response.status}`);
          }
        }
      } catch (error) {
        console.error("Error updating expense status:", error);
        setError("상태 업데이트 중 오류가 발생했습니다.");
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!expense) {
    return <div>로딩 중...</div>;
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
          <div>
            <strong>상태: </strong>
            {expense.status === "PENDING" && (
              <span className="status pending">대기중</span>
            )}
            {expense.status === "APPROVED" && (
              <span className="status accepted">수락됨</span>
            )}
            {expense.status === "REJECTED" && (
              <span className="status rejected">거절됨</span>
            )}
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
                  src={getImageUrl(url)} // 이미지 URL 처리 함수 사용
                  alt={`Expense image ${index + 1}`}
                  onClick={() => setSelectedImage(url)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="expense-detail-buttons">
          <button className="edit-button" onClick={handleEdit}>
            수정
          </button>

          {role === "ADMIN" && (
            <>
              <button
                className="accept-button"
                onClick={() => handleStatusChange("APPROVED")}
              >
                수락
              </button>
              <button
                className="reject-button"
                onClick={() => handleStatusChange("REJECTED")}
              >
                거절
              </button>
              <button className="delete-button" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseDetail;
