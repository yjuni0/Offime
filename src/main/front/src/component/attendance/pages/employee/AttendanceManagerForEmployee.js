import BackPage from "../../../BackPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../../../css/attendance.css';
import axios from "axios";

function AttendanceManagerForEmployee() {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [attendanceData, setAttendanceData] = useState(null);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleChangeDate = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        fetchAttendanceData(selectedDate);
    };

    const fetchAttendanceData = async (selectedDate) => {
        try {
            const token = localStorage.getItem("CL_access_token");
            const response = await axios.get("http://localhost:8080/weekly", {
                params: { date: selectedDate },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched Data:", response.data);
            setAttendanceData(response.data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    return (
        <>
            <BackPage />
            <section className="sec">
                <div className="inner">
                    <div className="item">
                        <p className="fs_lg">구트</p>

                        <p className="fs_lg">날짜</p>
                        <input
                            className="input input-txt fs_md mb_md"
                            type="date"
                            value={date}
                            onChange={handleChangeDate}
                            required
                        />
                        <p className="fs_lg">출근 현황</p>

                        {attendanceData ? (
                            <div>
                                <div className="item bg_pm mt_sm">
                                    <div className="fs_md tc-w">출근율</div>
                                    <div className="fs_md tc-w">{attendanceData.clockInCount} / 5</div>
                                </div>

                                <div className="attendance-row mt_md">
                                    <button
                                        className="attendance-box bg_wt"
                                        onClick={() => handleButtonClick('/clockInForEmployee')}
                                    >
                                        <div className="tc-pm">출근</div>
                                        <div className="right-square tc-pm">{attendanceData.clockInCount}</div>
                                    </button>
                                    <button
                                        className="attendance-box bg_wt"
                                        onClick={() => handleButtonClick('/absentForEmployee')}
                                    >
                                        <div className="tc-e">미출근</div>
                                        <div className="right-square tc-e">0</div>
                                    </button>
                                </div>

                                <button className="attendance-row mt_md">
                                    <div
                                        className="attendance-box bg_p04"
                                        onClick={() => handleButtonClick('/lateForEmployee')}
                                    >
                                        <div className="tc-w">지각</div>
                                        <div className="right-square">총 {attendanceData.totalLateMinutes} 분</div>
                                    </div>
                                    <div
                                        className="attendance-box bg_p03"
                                        onClick={() => handleButtonClick('/leaveEarlyForEmployee')}
                                    >
                                        <div className="tc-w">조퇴</div>
                                        <div className="right-square tc-w">총 {attendanceData.totalLeaveEarlyMinutes} 분</div>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
export default AttendanceManagerForEmployee;