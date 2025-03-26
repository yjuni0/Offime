import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";
import ExpenseSearch from "./ExpenseSearch";
import BackPage from "../BackPage";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]); // 초기값을 빈 배열로 설정
  const [filteredExpenses, setFilteredExpenses] = useState([]); // 필터링된 경비 목록
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉션
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return; // token이 없으면 fetchData 실행하지 않음

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
            setExpenses(expenseData); // 데이터가 배열이라면 상태 업데이트
            setFilteredExpenses(expenseData); // 필터링된 목록도 초기화
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
  }, [token]); // token이 변경될 때만 fetchData가 실행됨

  const handleTitleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSearch = ({ searchTerm }) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    // 검색어로 필터링
    const filtered = expenses.filter((expense) => {
      return (
        expense.title.toLowerCase().includes(lowercasedSearchTerm) ||
        expense.content.toLowerCase().includes(lowercasedSearchTerm) ||
        expense.category.toLowerCase().includes(lowercasedSearchTerm) ||
        String(expense.amount).includes(lowercasedSearchTerm) ||
        (expense.username || "").toLowerCase().includes(lowercasedSearchTerm) ||
        expense.expenseDate.includes(lowercasedSearchTerm)
      );
    });

    setFilteredExpenses(filtered); // 필터링된 목록을 업데이트
  };

  return (
    <>
      <BackPage />
      <main id="main" class="경비관리 목록">
        <section className="sec">
          <div className="inner">
            <h4 className="">경비 관리</h4>
            <ExpenseSearch onSearch={handleSearch} />
            <ul className="item">
              {filteredExpenses && filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <li
                    className=""
                    key={expense.id}
                    onClick={() => handleTitleClick(expense.id)}
                  >
                    <div className="flex space-between">
                      <p className="fs_md">
                        {expense.username || localStorage.getItem("username")}
                      </p>
                      <p className="fs_sm"> {expense.expenseDate}</p>
                    </div>
                    <h3 className="fs_md">{expense.title}</h3>
                    <p className="fs_sm"> {expense.category}</p>{" "}
                    <p className="fs_md">{expense.content}</p>
                    <p className="fs_md">금액: {expense.amount} 원</p>
                  </li>
                ))
              ) : (
                <p>등록된 게시글이 없습니다.</p>
              )}
            </ul>
            <button
              className="expense-list-add-button bg_pm tc-w fs_md p_md btn"
              onClick={() => navigate("/create")}
            >
              +
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ExpenseList;
