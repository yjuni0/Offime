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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("CL_access_token");
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

          // 데이터를 연도와 월을 기준으로 필터링
          const filteredData = data.filter((expense) => {
            const expenseYear = new Date(expense.expenseDate).getFullYear();
            const expenseMonth = new Date(expense.expenseDate).getMonth() + 1;
            return (
              expense.status === "APPROVED" &&
              expenseYear === selectedYear &&
              expenseMonth === selectedMonth
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
  }, [token, selectedYear, selectedMonth, navigate]);

  return (
    <>
      <BackPage />
      <main id="main" className="경비관리 승인내역">
        <div className="sec">
          <div className="inner">
            <div className=" bg_n0 item bg_pm mt_md">
              <div className="item">
                <h2>승인된 경비 내역</h2>
              </div>
              <div className="">
                <select
                  className=""
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
                  className=""
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  ))}
                </select>
              </div>
              {isLoading && <p>로딩 중...</p>}
              {error && <p className="error">{error}</p>}
              <ul className="">
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <li key={expense.id} className="bg_n0 item mt_md">
                      <p>
                        <strong>{expense.title}</strong> -{" "}
                        {expense.amount.toLocaleString()} 원
                      </p>
                      <p>{expense.expenseDate}</p>
                    </li>
                  ))
                ) : (
                  <p className="txt-a-c m_lg fs_lg">
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
