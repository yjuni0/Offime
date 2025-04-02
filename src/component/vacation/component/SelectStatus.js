import { useEffect, useState } from "react";
import { fetchVacationList } from "../api/apiVacation";
import VacationList from "../pages/VacationList";
import { Link, useParams } from "react-router-dom";

const SelectStatus = () => {
  const { status } = useParams(); // ✅ URL에서 status 가져오기
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await fetchVacationList();
        if (Array.isArray(response)) {
          setVacations(response);
        } else {
          setVacations([]);
        }
      } catch (error) {
        console.error("휴가 내역 불러오기 실패:", error);
      }
    };

    fetchVacations();
  }, []);

  // ✅ URL에 따라 필터링 (기본값: "전체")
  const statusFilter = status || "전체";
  const filteredVacations =
    statusFilter === "전체"
      ? vacations
      : vacations.filter((vacation) => vacation.status === statusFilter);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {/* ✅ 탭 UI */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "15px",
        }}
      >
        {/* ✅ "전체" 탭 따로 배치 */}
        <Link
          to="/vacationList"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: !status ? "bold" : "normal", // URL에 status가 없으면 "전체" 강조
            backgroundColor: !status ? "#007bff" : "#fff",
            color: !status ? "white" : "black",
            transition: "0.2s",
          }}
        >
          전체
        </Link>

        {/* ✅ 나머지 상태들 */}
        {["대기", "승인", "반려"].map((item) => (
          <Link
            key={item}
            to={`/vacationList/${item}`}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: status === item ? "bold" : "normal",
              backgroundColor: status === item ? "#007bff" : "#fff",
              color: status === item ? "white" : "black",
              transition: "0.2s",
            }}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* ✅ 필터링된 데이터 전달 */}
      {filteredVacations.length > 0 ? (
        <VacationList res={filteredVacations} />
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>
          해당 상태의 신청 내역이 없습니다.
        </p>
      )}
    </div>
  );
};

export default SelectStatus;
