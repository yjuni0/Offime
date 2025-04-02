import BackPage from "../../../BackPage";
import { useState, useEffect } from "react";
import '../../../../css/attendance.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdPeopleAlt } from "react-icons/md";

function AttendanceManagerForLeader() {
    const [viewType, setViewType] = useState("all");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState(null);

    const [date, setDate] = useState({
        title: "",
        content: "",
        category: "",
        date: "",
        photoUrls: [],
        amounts: [{ amount: "" }],
        totalAmount: 0,
    });

    const handleChangeDate = (e) => {
        setDate({ ...date, date: e.target.value });
        
    };

    const handleViewTypeChange = (type) => {
        setViewType(type);
        
    };
    useEffect(() => { fetchAttendanceData(selectedDate); }, [viewType, selectedDate]);

        const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const fetchAttendanceData = async (date) => {
        try {
            const token = localStorage.getItem("CL_access_token");
            const formattedDate = date.toISOString().split('T')[0];

            let response;
            if (viewType === "all") {
                response = await axios.get("http://localhost:8080/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        date: formattedDate
                    }
                });
            } else if (viewType === "team") {
                response = await axios.get("http://localhost:8080/weekly", {
                    params: { date: formattedDate },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            console.log("불러온 데이터:", response.data);
            setAttendanceData(response.data);

        } catch (error) {
            console.error("데이터 로드 오류:", error);
        }
    };

    return (
        <>
            <BackPage />
            <section className="sec">
                <div className="inner">
                    <div className="item">

                        <p className="fs_lg">출퇴근 현황</p>

                        {/* 전체/팀별 보기 선택 버튼 */}
                        <div className="view-type-selector">
                            <button
                                className={`btn ${viewType === "all" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("all")}
                            >전체 보기
                            </button>
                            <button
                                className={`btn ${viewType === "team" ? "active" : ""}`}
                                onClick={() => handleViewTypeChange("team")}
                            >팀별 보기
                            </button>
                        </div>

                        <p className="fs_lg mt_md">날짜 선택</p>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="input input-txt fs_md"
                        />

                        <p className="fs_lg mt_md">출근 현황</p>
                        
                        {/* 출근율 */}
                        <div className="item bg_pm mt_sm">
                            <div className="fs_md tc-w">
                                출근율
                            </div>
                            <div className="fs_md tc-w">
                                <MdPeopleAlt /> 0/0
                            </div>
                        </div>

                        {/* 출근과 미출근 */}
                        <div className="attendance-row mt_md">
                            <div className="attendance-box bg_wt">
                                <div className="tc-pm">출근</div>
                                <div className="right-square tc-pm">0</div>
                            </div>
                            <div className="attendance-box bg_wt">
                                <div className="tc-e">미출근</div>
                                <div className="right-square tc-e">0</div>
                            </div>
                        </div>

                        <div className="attendance-box mt_md bg_wt">
                            <div className=" tc-b">출근 전</div>
                            <div className="right-square tc-b">0</div>
                        </div>
                        
                        <div className="attendance-row mt_md">
                            <div className="attendance-box bg_p04">
                                <div className="tc-w">지각</div>
                                <div className="right-square">0</div>
                            </div>
                            <div className="attendance-box bg_p03">
                                <div className="tc-w">조퇴</div>
                                <div className="right-square tc-w">0</div>
                            </div>
                        </div>

                        <p className="fs_lg mt_md">출근인원 근무상태</p>

                        <div className="attendance-box work-status mt_md bg_wt">
                            {/* 근무 중 */}
                            <div className="status-row">
                                <span className="status-label">근무 중</span>
                                <span className="status-count">5명</span>
                            </div>

                            {/* 자리비움 중 */}
                            <div className="status-row">
                                <span className="status-label">자리비움 중 </span>
                                <span className="status-count">2명</span>
                            </div>

                            {/* 퇴근 */}
                            <div className="status-row">
                                <span className="status-label">퇴근</span>
                                <span className="status-count">3명</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AttendanceManagerForLeader;