import { useEffect, useState } from "react";
import { axiosPrivate } from "../../axios/axios";
import SelectCalendar from "../component/SelectCalendar";
const VacationApply = () => {
  const [response, setResponse] = useState([]);
  const memberId = localStorage.getItem("id");

  const getMemberData = async () => {
    const res = await axiosPrivate.get(`/member/${memberId}`);
    setResponse(res.data);
    console.log("멤버 정보 ", res);
  };
  useEffect(() => {
    getMemberData();
  }, []);
  return (
    <>
      <div className="item bg_pm mt_md">
        <div style={{ display: "flex", position: "relative" }}>
          <p style={{ color: "white", fontSize: "15px" }}>신청 가능한 휴가</p>
          <p
            style={{
              color: "white",
              fontSize: "24px",
              position: "absolute",
              right: "0px",
              fontWeight: "bold",
            }}
          >
            {response.availableLeaveDays}
            <span
              style={{
                color: "white",
                display: "inline-block",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              일
            </span>
          </p>
        </div>
        <span style={{ color: "white" }}>사용기한</span>
        <span
          style={{
            color: "white",
            display: "block",
            width: "auto",
            height: "auto",
          }}
        >
          {`${new Date().getFullYear()}-01-01 ~ ${new Date().getFullYear()}-12-31`}
        </span>
      </div>
      <SelectCalendar />
    </>
  );
};
export default VacationApply;
