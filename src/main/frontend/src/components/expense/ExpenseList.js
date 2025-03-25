import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const expenseResponse = await fetch("/api/expenses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (expenseResponse.ok) {
          const expenseData = await expenseResponse.json();
          if (Array.isArray(expenseData)) {
            setExpenses(expenseData);
          } else {
            console.error("Invalid expenses data format", expenseData);
          }
        } else {
          console.error("Error fetching expenses:", expenseResponse.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleTitleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">경비 관리</h2>
      <ul className="expense-list-wrapper">
        {expenses && expenses.length > 0 ? (
          expenses.map((expense) => (
            <li className="expense-list-item" key={expense.id}>
              <h3
                className="expense-list-title"
                onClick={() => handleTitleClick(expense.id)}
              >
                {expense.title}
              </h3>
              <p className="expense-list-content">{expense.content}</p>
              <p className="expense-list-amount">금액: {expense.amount} 원</p>
              <p className="expense-list-date">
                날짜: {expense.expenseDate} {/* 날짜 추가 */}
              </p>
              <p className="expense-list-author">
                작성자: {expense.username || localStorage.getItem("username")}
              </p>
            </li>
          ))
        ) : (
          <p>등록된 게시글이 없습니다.</p>
        )}
      </ul>
      <button
        className="expense-list-add-button"
        onClick={() => navigate("/create")}
      >
        +
      </button>
    </div>
  );
};

export default ExpenseList;
