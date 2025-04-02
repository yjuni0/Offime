import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";
import BackPage from "../BackPage";

const ApprovedExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedCategory, setSelectedCategory] = useState(""); // 카테고리 상태 추가
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("CL_access_token");

  const categories = ["식비", "교통", "숙박", "경조사", "기타"]; // 카테고리 목록 추가

  const handleCategoryChange = (category, e) => {
    // 카테고리 선택/해제 기능 구현
    if (category === selectedCategory) {
      setSelectedCategory(""); // 이미 선택된 카테고리가 다시 클릭되면 해제
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchApprovedExpenses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/api/expenses`, // 연도와 월은 프론트에서 필터링할 것
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

          // 데이터를 연도, 월, 카테고리 기준으로 필터링
          const filteredData = data.filter((expense) => {
            const expenseYear = new Date(expense.expenseDate).getFullYear();
            const expenseMonth = new Date(expense.expenseDate).getMonth() + 1;
            const categoryFilter =
              selectedCategory === "" || expense.category === selectedCategory;

            return (
              expense.status === "APPROVED" &&
              expenseYear === selectedYear &&
              expenseMonth === selectedMonth &&
              categoryFilter
            );
          });

          setExpenses(filteredData);
        } else {
          setError("승인된 지출 데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } catch (error) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedExpenses();
  }, [token, selectedYear, selectedMonth, selectedCategory, navigate]);

  return (
    <>
      <BackPage />
      <main id="main" className="경비관리 승인내역">
        <div className="sec">
          <div className="inner">
            <div className=" bg_n0 item bg_pm mt_md">
              <div className="item">
                <h3>승인된 경비 내역</h3>
              </div>
              <div className="txt-a-r ">
                <select
                  className="fs_md mb_md border_none border_bottom mr_sm "
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
                <select
                  className="fs_md mb_md border_none border_bottom mr_sm "
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  ))}
                </select>
                <div className="flex space-around">
                  {[...categories].map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`expense-button mb_md ${
                        selectedCategory === category ? "selected" : ""
                      }`}
                      onClick={(e) => handleCategoryChange(category, e)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              {isLoading && <p>로딩 중...</p>}
              {error && <p className="error">{error}</p>}
              <ul className="">
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <li key={expense.id} className="bg_n0 item">
                      <div className="space-between flex">
                        <p>{expense.expenseDate}</p>
                        <p> {expense.category}</p>
                      </div>
                      <p>
                        <strong>{expense.title}</strong> -{" "}
                        {expense.amount.toLocaleString()} 원
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="txt-a-c m_lg ">
                    해당 기간의 승인된 경비가 없습니다.
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ApprovedExpensesPage;
