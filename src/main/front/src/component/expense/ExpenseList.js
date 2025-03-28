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

  const formatAmount = (amount) => {
    if (!amount) return "";
    const amountString = String(amount); // 숫자를 문자열로 변환
    return amountString
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
            setExpenses(expenseData);
            setFilteredExpenses(expenseData);
          } else {
            console.error("잘못된 지출 데이터 형식", expenseData);
            setError("잘못된 데이터 형식입니다.");
          }
        } else {
          console.error(
            "지출 데이터를 가져오는 중 오류 발생:",
            expenseResponse.status
          );
          setError("지출 데이터를 가져오는 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("데이터 가져오기 중 오류 발생:", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]); // token이 변경될 때만 fetchData가 실행됨

  const handleTitleClick = (id) => {
    navigate(`/expenseDetail/${id}`);
  };

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    setHasNoResults(false);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Authorization token is missing.");
        setIsLoading(false);
        return;
      }

      const searchResponse = await fetch(
        `http://localhost:8080/api/expenses/search?searchTerm=${searchTerm}`,
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
        setFilteredExpenses(searchData);

        if (searchData.length === 0) {
          setHasNoResults(true);
        }
      } else {
        console.error("Error fetching search results:", searchResponse.status);
        setError("Error fetching search results.");
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
      setError("An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  // 상태에 따른 색상, 텍스트 등을 추가하는 함수
  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="btn btn-sm btn-pm fs_sm txt-a-c mb_xsm">
            대기 중
          </span>
        );
      case "APPROVED":
        return (
          <span className="btn btn-sm btn-p04 fs_sm txt-a-c mb_xsm">
            승인 됨
          </span>
        );
      case "REJECTED":
        return (
          <span className="btn btn-sm btn-e fs_sm txt-a-c mb_xsm">거절 됨</span>
        );
      default:
        return (
          <span className="btn btn-sm btn-pk fs_sm txt-a-c mb_xsm">
            알 수 없음
          </span>
        );
    }
  };
  return (
    <>
      <BackPage />
      <main id="main" className="경비관리 수정">
        <section className="sec ">
          <div className="inner">
            <div className=" bg_n0 item bg_pm mt_md">
              <h3>경비 관리</h3>
              <ExpenseSearch onSearch={handleSearch} />
              {isLoading && <p>로딩 중...</p>} {/* 로딩 상태 표시 */}
              {error && <p className="error">{error}</p>}{" "}
            </div>
            {/* 에러 메시지 표시 */}
            <ul className="">
              {hasNoResults ? (
                <p>검색된 결과가 없습니다.</p> // 검색 결과가 없을 때
              ) : filteredExpenses && filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <li
                    className=" bg_n0 item mt_md"
                    key={expense.id}
                    onClick={() => handleTitleClick(expense.id)}
                  >
                    {/* 상태 표시 추가 */}
                    <div className="space-between flex">
                      {getStatusLabel(expense.status)}{" "}
                      {/* 상태에 따라 다르게 표시 */}
                      <p className=""> {expense.expenseDate}</p>
                    </div>

                    <h4>{expense.title}</h4>

                    <p className="pl_xsm ">{expense.content}</p>

                    {/* <p className="">
                      {expense.username || localStorage.getItem("username")}
                    </p> */}
                    <div className="flex space-between">
                      <p className="pt_md "> {expense.category}</p>
                      <p className="fs_lg">{formatAmount(expense.amount)} 원</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="txt-a-c m_lg fs_lg">등록된 게시글이 없습니다.</p> // 등록된 경비가 없을 때
              )}
            </ul>
            <button
              className="btn btn-max btn-pm fs_lg mb_md mt_md"
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
