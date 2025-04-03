import YearBox from "../component/YearBox";
import vacationIc from "../image/vacation.png";
import UsedVacation from "../component/UsedVacation";
import { Link } from "react-router-dom";
const VacationPage = ({ res }) => {
  if (!res) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>로딩 중...</p>; // ✅ 중앙 정렬된 로딩 메시지
  }

  return (
    <>
      <YearBox />
      <div
        className="bg_n0 item mt_md"
        style={{ display: "flex", alignItems: "center", gap: "60px" }}
      >
        <h4 style={{ marginLeft: "20px", fontSize: "18px" }}>
          사용 가능한 휴가는
          <span
            style={{ fontSize: "25px", color: "#3299FE", fontWeight: "bold" }}
          >
            {res.availableLeaveDays}
          </span>
          일 입니다.
        </h4>
        <img
          src={vacationIc}
          alt="휴가"
          style={{ width: "70px", height: "auto" }}
        />
      </div>
      <Link to={"/vacationApply"}>
        <button
          className="btn btn-pm btn-max mt_md"
          style={{ font: "18px bold" }}
        >
          +
        </button>
      </Link>
      <h4 className="mt_md">최근 사용 내역</h4>
      <UsedVacation />
    </>
  );
};

export default VacationPage;
