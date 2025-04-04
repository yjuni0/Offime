import { Link } from "react-router-dom";
import calculateDays from "../utils/calculator";
import getStatusColor from "../utils/getStatusColor";
const VacationList = ({ res = [] }) => {
  return (
    <>
      {res.length === 0 ? (
        <p>사용한 휴가가 없습니다.</p>
      ) : (
        <ul
          className="item"
          style={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {res?.map((vacation) => (
            <Link to={`/vacation/${vacation.id}`} key={vacation.id}>
              <li
                className="item mt_md"
                style={{
                  backgroundColor: "#F2F4F6",
                  padding: "15px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>{vacation.type}</h4>
                  <p
                    style={{
                      color: getStatusColor(vacation.status),
                      fontWeight: "bold",
                    }}
                  >
                    {vacation.status}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    {vacation.startDate} ~ {vacation.endDate}
                  </p>
                  <p style={{ fontSize: "18px" }}>
                    {calculateDays(vacation.startDate, vacation.endDate)}일
                  </p>
                </div>

                <p style={{ color: "#666" }}>{vacation.createdDate}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};
export default VacationList;
