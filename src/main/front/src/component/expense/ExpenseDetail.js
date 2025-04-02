import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackPage from "../BackPage";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";

const formatAmount = (amount) => {
  if (!amount) return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ExpenseDetail = () => {
  const [expense, setExpense] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchExpenseDetail = async () => {
      try {
        const token = localStorage.getItem("CL_access_token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/expenses/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setExpense(data);
        } else {
          console.error("데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error.message);
      }
    };

    fetchExpenseDetail();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("CL_access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/expenses/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          navigate("/expenseList");
        } else {
          console.error("Error deleting expense:", response.status);
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/expenseUpdate/${id}`);
  };

  const handleStatusChange = async (status) => {
    if (role !== "ADMIN") {
      alert("이 작업을 수행할 권한이 없습니다.");
      return;
    }

    const action = status === "APPROVED" ? "승인" : "거절";

    if (window.confirm(`이 경비를 ${action}하시겠습니까?`)) {
      try {
        const token = localStorage.getItem("CL_access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/expenses/${id}/status?status=${status}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedExpense = await response.json();
          setExpense(updatedExpense);
          navigate(-1);
        } else {
          console.error("Error updating expense status:", response.status);
        }
      } catch (error) {
        console.error("Error updating expense status:", error);
      }
    }
  };

  if (!expense) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <BackPage />
      <main id="main" className="경비관리 상세">
        <section className="sec ">
          <div className="inner">
            <div className="bg_n0 item bg_pm mt_md mb_md ">
              <div className="flex space-between">
                <h3>{expense.title}</h3>
                <div className="pt_sm">
                  {expense.status === "PENDING" && (
                    <span className="btn btn-sm btn-pm fs_sm txt-a-c mb_xsm">
                      대기중
                    </span>
                  )}
                  {expense.status === "APPROVED" && (
                    <span className="btn btn-sm btn-p04 fs_sm txt-a-c mb_xsm">
                      수락됨
                    </span>
                  )}
                  {expense.status === "REJECTED" && (
                    <span className="btn btn-sm btn-e fs_sm txt-a-c mb_xsm">
                      거절됨
                    </span>
                  )}
                </div>
              </div>
              {expense.imageUrls && expense.imageUrls.length > 0 && (
                <div className="pb_md item">
                  {expense.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Expense image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              <div>
                <div>
                  <p className="fs_lg pb_sm">작성자</p>
                  <p className="fs_md mb_md tc-pm">{expense.username}</p>
                </div>
                <div>
                  <p className="fs_lg pb_sm">금액</p>
                  <p className="fs_md mb_md tc-pm">
                    {formatAmount(expense.amount)} 원
                  </p>
                </div>
                <div>
                  <p className="fs_lg pb_sm">날짜</p>
                  <p className="fs_md mb_md tc-pm">
                    {new Date(expense.expenseDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="fs_lg pb_sm">유형</p>
                  <p className="fs_md mb_md tc-pm">{expense.category}</p>
                </div>
                <div>
                  <p className="fs_lg pb_sm">내용</p>
                  <p className="fs_md mb_md tc-pm">{expense.content}</p>
                </div>
              </div>
            </div>

            <div>
              <button
                className="btn btn-max btn-p04 fs_lg mb_md"
                onClick={handleEdit}
              >
                수정
              </button>

              {role === "ADMIN" && (
                <div>
                  <button
                    className="btn btn-max btn-p05 fs_lg mb_md"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                  <div className="flex space-between">
                    <button
                      className="btn btn-max btn-pm fs_md mb_md"
                      onClick={() => handleStatusChange("APPROVED")}
                    >
                      승인
                    </button>
                    <button
                      className="btn btn-max btn-e fs_md mb_md"
                      onClick={() => handleStatusChange("REJECTED")}
                    >
                      거절
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ExpenseDetail;
