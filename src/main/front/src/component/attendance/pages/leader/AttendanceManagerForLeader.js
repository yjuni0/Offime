import BackPage from "../../../BackPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import '../../../../css/attendance.css';

function AttendanceManagerForLeader() {
    const navigate = useNavigate();
    const [date, setDate] = useState({
        title: "",
        content: "",
        category: "",
        date: "",
        photoUrls: [], // 빈 배열로 초기화
        amounts: [{ amount: "" }],
        totalAmount: 0,
    });


    const handleButtonClick = (path) => {
        navigate(path);
    };

    const handleChangeDate = (e) => {
    setDate({ ...date, date: e.target.value });
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
                            value={date.date}
                            onChange={handleChangeDate}
                            required
                        />
                        <p className="fs_lg">출근 현황</p>
                        
                        {/* 출근율 */}
                        <div className="item bg_pm mt_md">
                            <div className="fs_md tc-w">
                                출근율
                            </div>
                            <div className="fs_md tc-w">
                                <MdPeopleAlt /> 0/0
                            </div>
                        </div>

                        {/* 출근과 미출근 */}
                        <div className="attendance-row mt_md">
                            <button className="attendance-box bg_wt" onClick={() => handleButtonClick('/clockInForLeader')}>
                                <div className="tc-pm">출근</div>
                                <div className="right-square tc-pm">0</div>
                            </button>
                            <button className="attendance-box bg_wt" onClick={() => handleButtonClick('/absentForLeader')}>
                                <div className="tc-e">미출근</div>
                                <div className="right-square tc-e">0</div>
                            </button>
                        </div>

                        <button className="attendance-box mt_md bg_wt" onClick={() => handleButtonClick('/beforeClockInForLeader')}>
                            <div className=" tc-b">출근 전</div>
                            <div className="right-square tc-b">0</div>
                        </button>

                        <button className="attendance-box mt_md bg_wt" onClick={() => handleButtonClick('/workStatusForLeader')}>
                            <div className="work-status mt_md tc-b">출근인원 근무상태
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
                        </button>

                        <button className="attendance-row mt_md">
                            <div className="attendance-box bg_p04" onClick={() => handleButtonClick('/lateForLeader')}>
                                <div className="tc-w">지각</div>
                                <div className="right-square">0</div>
                            </div>
                            <div className="attendance-box bg_p03" onClick={() => handleButtonClick('/leaveEarlyForLeader')}>
                                <div className="tc-w">조퇴</div>
                                <div className="right-square tc-w">0</div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AttendanceManagerForLeader;
