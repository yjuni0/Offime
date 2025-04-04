import { useEffect, useState } from "react";
import { axiosPrivate } from "../../axios/axios";
import CustomPagination from "../component/CustomPagination";
import calculateDays from "../utils/calculator";
import { Link } from "react-router-dom";
function VacationAdminPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [vacations, setVacations] = useState([]);
  const getPendingVacation = async () => {
    try {
      const response = await axiosPrivate.get("/vacation/wait", {
        params: {
          page: page - 1,
          status: "WAITING",
        },
      });
      if (Array.isArray(response.data.content)) {
        setVacations(response.data.content);
        setPageSize(response.data.pageSize);
        setTotalPages(response.data.totalPages);
        setTotalCnt(response.data.totalElement);
      } else {
        setVacations([]);
      }
    } catch (error) {
      console.error("휴가 목록을 가져오는 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("role") === "ADMIN") {
      alert("관리자만 접근할 수 있습니다.");
      window.location.href = "/home";
    }
    getPendingVacation();
  }, [page]);

  return (
    <>
      <h4 className="mt_md">승인 대기 중</h4>

      {vacations.map((vacation) => (
        <Link to={`/vacation/${vacation.id}`}>
          <div
            className="bg_n0 item mt_md"
            style={{ position: "relative" }}
            key={vacation.id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <p>신청자: {vacation.memberName}</p>
              <p
                style={{
                  backgroundColor: "gray",
                  borderRadius: "15px",
                  width: "50px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {vacation.status}
              </p>
            </div>

            <p>날짜 </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <p>
                {vacation.startDate} ~ {vacation.endDate}
              </p>

              <div>
                <p style={{ fontSize: "20px", color: "#3299fe" }}>
                  {calculateDays(vacation.startDate, vacation.endDate)}
                  <span style={{ fontSize: "18px" }}>일</span>
                </p>
              </div>
            </div>
            <p
              style={{
                position: "absolute",
                fontSize: "14px",
                right: "10px",
                bottom: "10px",
              }}
            >
              신청일: {vacation.createdDate}
            </p>
          </div>
        </Link>
      ))}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          bottom: "20px",
        }}
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
}
export default VacationAdminPage;
