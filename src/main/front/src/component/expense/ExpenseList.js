import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";
import ExpenseSearch from "./ExpenseSearch";
import BackPage from "../BackPage";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]); // 전체 경비 목록
  const [filteredExpenses, setFilteredExpenses] = useState([]); // 필터링된 경비 목록
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [hasNoResults, setHasNoResults] = useState(false); // 검색 결과 없음 상태
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
      setIsLoading(true); // 로딩 시작
      setError(null); // 이전 에러 상태 초기화

      try {
        const expenseResponse = await fetch(
          "http://localhost:8080/api/expenses",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (expenseResponse.ok) {
          const expenseData = await expenseResponse.json();

          if (Array.isArray(expenseData)) {
            setExpenses(expenseData); // 데이터가 배열이라면 상태 업데이트
            setFilteredExpenses(expenseData); // 필터링된 목록도 초기화
          } else {
            console.error("Invalid expenses data format", expenseData);
            setError("Invalid data format.");
          }
        } else {
          console.error("Error fetching expenses:", expenseResponse.status);
          setError("Error fetching expenses.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };

    fetchData();
  }, [token]); // token이 변경될 때만 fetchData가 실행됨

  const handleTitleClick = (id) => {
    navigate(`/expenseDetail/${id}`);
  };

  const handleSearch = async ({ searchTerm }) => {
    setIsLoading(true); // 검색 시 로딩 시작
    setError(null); // 이전 에러 상태 초기화
    setHasNoResults(false); // 검색 결과 없음을 초기화

    if (!searchTerm) {
      setError("Search term is required.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("access_token"); // 토큰 가져오기
      if (!token) {
        setError("Authorization token is missing.");
        setIsLoading(false);
        return;
      }

      const searchResponse = await fetch(
        `/api/expenses/search?searchTerm=${searchTerm}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        setFilteredExpenses(searchData); // 검색 결과를 필터링된 목록으로 설정

        if (searchData.length === 0) {
          setHasNoResults(true); // 검색 결과가 없으면 상태 업데이트
        }
      } else {
        console.error("Error fetching search results:", searchResponse.status);
        setError("Error fetching search results.");
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setError("An error occurred while searching.");
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  // 상태에 따른 색상, 텍스트 등을 추가하는 함수
  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="status pending">대기중</span>;
      case "APPROVED":
        return <span className="status accepted">수락됨</span>;
      case "REJECTED":
        return <span className="status rejected">거절됨</span>;
      default:
        return <span className="status unknown">알 수 없음</span>;
    }
  };
  return (
    <>
      <BackPage />
      <main id="main" className="경비관리 목록">
        <section className="sec bg_n20">
          <div className="inner">
            <h4>경비 관리</h4>
            <ExpenseSearch onSearch={handleSearch} />
            {isLoading && <p>로딩 중...</p>} {/* 로딩 상태 표시 */}
            {error && <p className="error">{error}</p>} {/* 에러 메시지 표시 */}
            <ul className="item">
              {hasNoResults ? (
                <p>검색된 결과가 없습니다.</p> // 검색 결과가 없을 때
              ) : filteredExpenses && filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <li
                    className="mb_md expense-list-form bg_n0"
                    key={expense.id}
                    onClick={() => handleTitleClick(expense.id)}
                  >
                    <div className="flex space-between mb_md expense-list-box">
                      <p className="fs_md m_sm">
                        {expense.username || localStorage.getItem("username")}
                      </p>
                      <p className="fs_xsm m_sm"> {expense.expenseDate}</p>
                    </div>

                    <h3>{expense.title}</h3>

                    <div className="flex space-between pb_md">
                      <p className="fs_sm tc-pk"> {expense.category}</p>
                      <p className="fs_md">{expense.amount} 원</p>
                    </div>
                    <p className="fs_md">{expense.content}</p>

                    {/* 상태 표시 추가 */}
                    <div className="status-container">
                      {getStatusLabel(expense.status)}{" "}
                      {/* 상태에 따라 다르게 표시 */}
                    </div>
                  </li>
                ))
              ) : (
                <p>등록된 게시글이 없습니다.</p> // 등록된 경비가 없을 때
              )}
            </ul>
            <button
              className="expense-list-add-button bg_pm tc-w fs_md p_md btn"
              onClick={() => navigate("/ExpenseWrite")}
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
