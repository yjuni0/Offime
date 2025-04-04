import { useEffect, useState } from "react";
import { fetchVacationList } from "../api/apiVacation";
import VacationList from "../pages/VacationList";
import { Link, useParams } from "react-router-dom";
import CustomPagination from "./CustomPagination";

const SelectStatus = () => {
  const { status } = useParams(); // ✅ URL에서 status 가져오기
  const [vacations, setVacations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const fetchVacations = async (currentPage = page) => {
    try {
      const response = await fetchVacationList(currentPage);
      console.log("불러온 휴가 리스트 : ", response);
      if (Array.isArray(response.content)) {
        setVacations(response.content);
        setPageSize(response.pageSize);
        setTotalPages(response.totalPages);
        setTotalCnt(response.totalElement);
      } else {
        setVacations([]);
      }
    } catch (error) {
      console.error("휴가 내역 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchVacations();
  }, [page]); // ✅ page 변경 시 API 호출

  // ✅ URL에 따라 필터링 (기본값: "전체")
  const statusFilter = status || "전체";
  const filteredVacations =
    statusFilter === "전체"
      ? vacations
      : vacations.filter((vacation) => vacation.status === statusFilter);

  return (
    <>
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
          <Link
            to="/vacationList"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: !status ? "bold" : "normal",
              backgroundColor: !status ? "#007bff" : "#fff",
              color: !status ? "white" : "black",
              transition: "0.2s",
            }}
          >
            전체
          </Link>

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

        {filteredVacations.length > 0 ? (
          <VacationList res={filteredVacations} />
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>
            해당 상태의 신청 내역이 없습니다.
          </p>
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", bottom: "20px" }}
      >
        {/* ✅ 페이지네이션 추가 */}
        <CustomPagination
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          totalCnt={totalCnt}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default SelectStatus;
