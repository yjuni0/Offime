import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";
import ExpenseSearch from "./ExpenseSearch";
import BackPage from "../BackPage";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const pageNumbersToShow = 5;
  const startPage = Math.max(
    currentPage - Math.floor(pageNumbersToShow / 2),
    1
  );
  const endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);

  const showEllipsisBefore = startPage > 1;
  const showEllipsisAfter = endPage < totalPages;

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExpenses.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatAmount = (amount) => {
    if (!amount) return "";
    const amountString = String(amount);
    return amountString
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("CL_access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

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
            setTotalPages(Math.ceil(expenseData.length / itemsPerPage));
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
  }, [token]);

  const handleTitleClick = (id) => {
    navigate(`/expenseDetail/${id}`);
  };

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    setHasNoResults(false);

    try {
      const token = localStorage.getItem("CL_access_token");
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
        setCurrentPage(1);
        setTotalPages(Math.ceil(searchData.length / itemsPerPage));
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
              {isLoading && <p>로딩 중...</p>}
              {error && <p className="error">{error}</p>} {/* 승인 경비 */}
              <button
                onClick={() => navigate("/approved-expenses")}
                className="btn btn-sm btn-p04"
              >
                승인 경비
              </button>
              {/* 제미니 */}
              <button
                onClick={() => navigate("/chatbot")}
                className="btn btn-sm btn-p02"
              >
                제미니
              </button>
            </div>

            <ul className="">
              {hasNoResults ? (
                <p>검색된 결과가 없습니다.</p>
              ) : getPaginatedData().length > 0 ? (
                getPaginatedData().map((expense) => (
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

            <div className="txt-a-c p_sm">
              {showEllipsisBefore && <button>...</button>} {/* 앞쪽 생략 */}
              {visiblePages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  id={currentPage === pageNumber ? "active" : ""}
                  className="p_sm fs_md"
                >
                  {pageNumber}
                </button>
              ))}
              {showEllipsisAfter && <button>...</button>} {/* 뒤쪽 생략 */}
            </div>

            <button
              className="btn btn-max btn-pm fs_lg mb_md "
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
