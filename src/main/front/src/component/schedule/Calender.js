import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Calender(){
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeDay, setActiveDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState();

    useEffect(() => {
        renderCalendar();
    }, [currentDate]);

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const prevLastDate = new Date(year, month, 0).getDate();
        const nextDate = new Date(year, month, 1).getDate();

        const daysArray = [];

        // 지난달 날짜 추가 (비활성)
        for (let i = firstDay - 1; i >= 0; i--) {
            daysArray.push({
                year,
                month: month - 1,
                day: prevLastDate - i,
                inactive: true,
            });
        }


        // 이번 달 날짜 추가
        for (let i = 1; i <= lastDate; i++) {
            const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();

            daysArray.push({
                year,
                month,
                day: i,
                today: isToday,
                inactive: false, // 오늘 이전 날짜는 비활성
            });
        }

        // 다음 달 날짜 추가
        for (let i = 1; i < 7 - lastDay; i++) {
            daysArray.push({
                year,
                month: month + 1,
                day: i,
                inactive: true,
            });
        }



        return daysArray;
    }

    function handleSelectDay(dayObj) {
        setActiveDay(dayObj);
        setSelectedDate(
            `${dayObj.year}-${String(dayObj.month + 1).padStart(2, "0")}-${String(dayObj.day).padStart(2, "0")}`
        );
    }

    return(
        <>
            <div className="calender-container">
                <p className="hidden">calender page</p>
                <div className="calender-wrap">
                    <div className="calendar">
                        <input type="text" value={selectedDate} readOnly id="selectedDate" placeholder="선택 날짜 확인용"/>
                        <div className="calendar-header">
                            <p id="monthYear" className="cal-month">
                                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                            </p>
                        </div>
                        <div className="weekdays">
                            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>
                        <div className="days">
                            {renderCalendar().map((date, index) => {
                                const isActive =
                                    activeDay &&
                                    activeDay.year === date.year &&
                                    activeDay.month === date.month &&
                                    activeDay.day === date.day;
                                return (
                                    <div
                                        key={index}
                                        className={`day ${date.today ? "today" : ""} ${date.inactive ? "inactive" : ""} ${isActive ? "active" : ""}`}
                                        onClick={() => handleSelectDay(date)}
                                    >
                                        <p>{date.day}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="dark-area"></div>
            <div className="schedule-detail">

            </div>
        </>
    );
}

export default Calender;