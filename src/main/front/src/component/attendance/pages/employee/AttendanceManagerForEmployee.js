// import BackPage from "../../../BackPage";
// import { useState, useEffect } from "react";
// import '../../../../css/attendance.css';
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function AttendanceManagerForEmployee() {
//     const [viewType, setViewType] = useState("weekly");
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [attendanceData, setAttendanceData] = useState(null);
//     // const [userName, setUserName] = useState("");
//     // useEffect(() => {
//     //     const storedUserName = localStorage.getItem("userName");
//     //     if (storedUserName) {
//     //         setUserName(storedUserName);
//     //     }
//     // }, []);

//     useEffect(() => { fetchAttendanceData(selectedDate); }, [viewType, selectedDate]);

//     const fetchAttendanceData = async (date) => {
//         try {
//             const token = localStorage.getItem("CL_access_token");
//             const formattedDate = date.toISOString().split('T')[0];

//             let response;
//             if (viewType === "daily") {
//                 response = await axios.get("http://localhost:8080/daily", {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     params: {
//                         date: formattedDate
//                     }
//                 });
//             } else if (viewType === "weekly") {
//                 response = await axios.get("http://localhost:8080/weekly", {
//                     params: { date: formattedDate },
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//             } else if (viewType === "monthly") {
//                 const year = date.getFullYear();
//                 const month = date.getMonth() + 1;
//                 response = await axios.get("http://localhost:8080/monthly", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: { year: year, month: month },
//                 });
//             }
//             console.log("불러온 데이터:", response.data);
//             setAttendanceData(response.data);

//         } catch (error) {
//             console.error("데이터 로드 오류:", error);
//         }
//     };

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//     };

//     const handleViewTypeChange = (type) => {
//         setViewType(type);
//     };

//     return (
//         <>
//             <BackPage />
//             <section className="sec">
//                 <div className="inner">
//                     <div className="item">
//                         {/* <p className="fs_lg">{userName}</p> */}
//                         <p className="fs_lg">내 출퇴근 이력</p>

//                         {/* 일간/주간/월간 보기 선택 버튼 */}
//                         <div className="view-type-selector">
//                             <button
//                                 className={`btn ${viewType === "daily" ? "active" : ""}`}
//                                 onClick={() => handleViewTypeChange("daily")}
//                             >일간 보기
//                             </button>
//                             <button
//                                 className={`btn ${viewType === "weekly" ? "active" : ""}`}
//                                 onClick={() => handleViewTypeChange("weekly")}
//                             >주간 보기
//                             </button>
//                             <button
//                                 className={`btn ${viewType === "monthly" ? "active" : ""}`}
//                                 onClick={() => handleViewTypeChange("monthly")}
//                             >월간 보기
//                             </button>
//                         </div>

//                         {/* 조건부로 달력 렌더링 */}
//                         {viewType === "daily" && (
//                             <>
//                                 <p className="fs_lg mt_md">날짜 선택</p>
//                                 <DatePicker
//                                     selected={selectedDate}
//                                     onChange={handleDateChange}
//                                     dateFormat="yyyy-MM-dd"
//                                     className="input input-txt fs_md"
//                                 />
//                             </>
//                         )}
//                         {viewType === "weekly" && (
//                             <>
//                                 <p className="fs_lg mt_md">주중 날짜 선택</p>
//                                 <DatePicker
//                                     selected={selectedDate}
//                                     onChange={handleDateChange}
//                                     dateFormat="yyyy-MM-dd"
//                                     className="input input-txt fs_md"
//                                 />
//                             </>
//                         )}
//                         {viewType === "monthly" && (
//                             <>
//                                 <p className="fs_lg mt_md">월 선택</p>
//                                 <DatePicker
//                                     selected={selectedDate}
//                                     onChange={handleDateChange}
//                                     dateFormat="yyyy-MM"
//                                     showMonthYearPicker
//                                     className="input input-txt fs_md"
//                                 />
//                             </>
//                         )}

//                         <p className="fs_lg mt_md">출근 현황</p>

//                         {attendanceData ? (
//                             <>
//                                 {viewType === "daily" && (
//                                     <>
//                                         <div className="item bg_pm mt_sm">
//                                             <div className="fs_md tc-w">일별 출근 기록</div>
//                                         </div>
//                                             <div className="attendance-details mt_md">
//                                                 <p>날짜: {attendanceData.date}</p>
//                                                 <p>출근 시간: {attendanceData.clockIn}</p>
//                                                 <p>퇴근 시간: {attendanceData.clockOut}</p>
//                                                 <p>자리 비움 시간: {attendanceData.outOfOffice}</p>
//                                                 <p>복귀 시간: {attendanceData.returnToOffice}</p>
//                                                 <p>자리 비움 타입: {attendanceData.outOfOfficeType}</p>
//                                             </div>
//                                     </>
//                                 )}
//                                 {viewType === "weekly" && (
//                                     <>
//                                         <div className="item bg_pm mt_sm">
//                                             <div className="fs_md tc-w">출근율</div>
//                                             <div className="fs_md tc-w">{attendanceData.clockInCount} / 5</div>
//                                         </div>

//                                         <div className="attendance-row mt_md">
//                                             <div className="attendance-box bg_wt">
//                                                 <div className="tc-pm">출근</div>
//                                                 <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
//                                             </div>
//                                             <div className="attendance-box bg_wt">
//                                                 <div className="tc-e">미출근</div>
//                                                 <div className="right-square tc-e">{attendanceData.absentCount}</div>
//                                             </div>
//                                         </div>

//                                         <div className="attendance-row mt_md">
//                                             <div className="attendance-box bg_p04">
//                                                 <div className="tc-w">지각</div>
//                                                 <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
//                                             </div>
//                                             <div className="attendance-box bg_p03">
//                                                 <div className="tc-w">조퇴</div>
//                                                 <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}
//                                 {viewType === "monthly" && (
//                                     <>
//                                         <div className="item bg_pm mt_sm">
//                                             <div className="fs_md tc-w">출근율</div>
//                                             <div className="fs_md tc-w">{attendanceData.clockInCount} / 5</div>
//                                         </div>

//                                         <div className="attendance-row mt_md">
//                                             <div className="attendance-box bg_wt">
//                                                 <div className="tc-pm">출근</div>
//                                                 <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
//                                             </div>
//                                             <div className="attendance-box bg_wt">
//                                                 <div className="tc-e">미출근</div>
//                                                 <div className="right-square tc-e">{attendanceData.absentCount}</div>
//                                             </div>
//                                         </div>

//                                         <div className="attendance-row mt_md">
//                                             <div className="attendance-box bg_p04">
//                                                 <div className="tc-w">지각</div>
//                                                 <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
//                                             </div>
//                                             <div className="attendance-box bg_p03">
//                                                 <div className="tc-w">조퇴</div>
//                                                 <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}
//                             </>
//                         ) : (
//                             <p>달력을 통해 날짜를 선택해 주세요.</p>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
// export default AttendanceManagerForEmployee;
