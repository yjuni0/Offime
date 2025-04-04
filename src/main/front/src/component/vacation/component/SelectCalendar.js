import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/datePicker.css";
import VacationApplyButton from "./VacationApplyButton";
import { useNavigate } from "react-router-dom";
import { applyVacation } from "../api/apiVacation";
import calculateDays from "../utils/calculator";
const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("연차");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  // 📌 req 객체를 useMemo로 최적화
  const req = useMemo(
    () => ({
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      endDate: endDate ? endDate.toISOString().split("T")[0] : "",
      reason: reason,
      type: type,
    }),
    [startDate, endDate, reason, type]
  );

  const handleApply = async () => {
    try {
      const result = await applyVacation(req);
      alert(result.message || "휴가 신청 성공!"); // ✅ 성공 메시지 출력
      navigate("/vacation"); // ✅ 휴가 신청 후 휴가 페이지로 이동
    } catch (error) {
      alert(error.message || "휴가 신청 실패"); // ✅ 에러 메시지 출력
    }
  };

  return (
    <>
      <div className="date-picker-container">
        <h4 className="calendarH4">
          날짜<span className="required">*</span>
        </h4>
        <div className="calendar-wrapper">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
              setDateRange(dates);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className="custom-datepicker"
          />
        </div>

        <div className="selected-dates">
          <div className="date-box">
            <p>시작일</p>
            <span>
              {startDate ? startDate.toISOString().split("T")[0] : "YYYY-MM-DD"}
            </span>
          </div>
          <div className="date-box">
            <p>종료일</p>
            <span>
              {endDate ? endDate.toISOString().split("T")[0] : "YYYY-MM-DD"}
            </span>
          </div>
        </div>
        <div
          className="item bg_n0 mt_md"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>총</h4>
          <p style={{ fontSize: "24px", color: "#3299FE" }}>
            {startDate && endDate ? calculateDays(startDate, endDate) : 0}
          </p>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>일</span>
        </div>
        <h4 className="calendarH4">
          단위<span className="required">*</span>
        </h4>
        <select
          className="unit-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="연차">연차</option>
          <option value="반차">반차</option>
          <option value="반반차">반반차</option>
        </select>

        <h4 className="calendarH4">
          사유<span className="required">*</span>
        </h4>
        <div className="reason-container item bg_n0">
          <textarea
            className="reason-box"
            value={reason}
            placeholder="사유를 작성해 주세요"
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          ></textarea>
        </div>
      </div>

      {/* 🛠 handleApply 함수 전달 */}
      <VacationApplyButton handleApply={handleApply} />
    </>
  );
};

export default DateRangePicker;
