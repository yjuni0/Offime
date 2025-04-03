import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {HttpHeadersContext} from "../context/HttpHeadersProvider";

function Calender(){
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());

    const [activeDay, setActiveDay] = useState(null);
    const defaultDate = (today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate()).toString() ;
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const [selectedDay, setSelectedDay] = useState(dayNames[today.getDay()]);
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

    const [writeOpen, setWriteOpen] = useState(false);
    const [yearMonthOpen, setYearMonthOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [startTime,setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const [memo,setMemo] = useState("");
    const colors = [ 'blue', 'navy', 'yellow', 'green', 'red' ];
    const [schedColor, setSchedColor] = useState('blue');
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const exmp = {
        id: 1,
        memberId: 1,
        date:"2025-04-02",
        startTime:"13:00",
        endTime:"18:00",
        breakTime:"15:00",
        memo: "example text",
        color: "blue"
    };

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
            const date = new Date(year, month - 1, prevLastDate - i);
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            const scheduleItems = schedules.filter(s =>
                s.date === `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevLastDate - i).padStart(2, '0')}`
            );
            daysArray.push({
                year: prevYear,
                month: prevMonth,
                day: prevLastDate - i,
                dayName: dayNames[date.getDay()],
                inactive: true,
                schedules: scheduleItems
            });
        }


        // 이번 달 날짜 추가
        for (let i = 1; i <= lastDate; i++) {
            const date = new Date(year, month, i);
            const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate();
            const scheduleItems = schedules.filter(s =>
                s.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            );
            daysArray.push({
                year,
                month,
                day: i,
                dayName: dayNames[date.getDay()],
                today: isToday,
                inactive: false,
                schedules: scheduleItems
            });
        }

        // 다음 달 날짜 추가
        for (let i = 1; i < 7 - lastDay; i++) {
            const date = new Date(year, month + 1, i);
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextYear = month === 11 ? year + 1 : year;
            const scheduleItems = schedules.filter(s =>
                s.date === `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            );
            daysArray.push({
                year: nextYear,
                month: nextMonth,
                day: i,
                dayName: dayNames[date.getDay()],
                inactive: true,
                schedules: scheduleItems
            });
        }

        return daysArray;
    }

    function handleSelectDay(dayObj) {
        console.log(dayObj);
        console.log(dayObj.dayName)
        setActiveDay(dayObj);
        setSelectedDate(
            `${dayObj.year}-${String(dayObj.month + 1).padStart(2, "0")}-${String(dayObj.day).padStart(2, "0")}`
        );
        setSelectedDay(`${dayObj.dayName}`);
    }

    function handleEdit() {
        setWriteOpen(prev => !prev);
    }
    function handleYearMonth() {
        setYearMonthOpen(prev => !prev);
    }

    function handleSelect(month) {
        setSelectedMonth(month);
    }
    function increaseYear() {
        setSelectedYear(prev => prev + 1);
    }
    function decreaseYear() {
        setSelectedYear(prev => prev - 1);
    }

    function handleConfirmYM() {
        setCurrentDate(new Date(selectedYear, selectedMonth - 1));
        setYearMonthOpen(false);
    }
    function handleCancelYM() {
        setYearMonthOpen(false);
    }

    function handleSchedColor(index) {
        setSelectedColorIndex(index);
        setSchedColor(colors[selectedColorIndex]);
    }

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
        setDetailOpen(true);
    };



    useEffect(() => {
        getSchedule(selectedYear,selectedMonth)
    }, []);

    const getSchedule = async ()=>{
        await axios.get("http://localhost:8080/schedule/list", {params:{"year":selectedYear, "month": selectedMonth}, headers})
            .then(response=>{
                console.log("[Calender.js] getSchedule() success.");
                console.log(response.data);
                setSchedules(response.data);
            })
            .catch(error => {
                console.log("[Calender.js] getSchedule() error.");
                console.error("스케줄을 가져올 수 없습니다.", error);
            })
    }

    const writeSchedule = async () =>{
        try{
            const req = {
                memberId : parseInt(localStorage.getItem('id'),10),
                date : selectedDate,
                startTime : startTime,
                endTime : endTime,
                breakTime : breakTime,
                memo : memo,
                color : schedColor,
            };
           const response = await axios.post("http://localhost:8080/schedule/write", req);
           console.log("[Calender.js] writeSchedule() success.");
           console.log(response.data);
           setWriteOpen(false);
           getSchedule();

        } catch (error){
            console.log("[Calender.js] writeSchedule() error.");
            console.error("스케줄등록에 실패했습니다.", error);
        }

    }

    return(
        <>
            <div className= {writeOpen ? "calendar-container active" : "calendar-container"}>
                <p className="hidden">calendar page</p>
                <div className="calender-wrap">
                    <div className="calendar">
                        <div className="calendar-header">
                            <p id="monthYear" className="cal-month" onClick={handleYearMonth}>
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
                                const scheduleItems = schedules.filter(s =>
                                    s.date === `${date.year}-${String(date.month + 1).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
                                );
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
                                        {scheduleItems.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`sched ${item.color}`}
                                                onClick={() => handleScheduleClick(item)}
                                            >
                                                <p className="fs_xsm active">{item.memo}</p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`dark-area ${yearMonthOpen || detailOpen ? 'active' : ''}`} onClick={()=>{setYearMonthOpen(false); setDetailOpen(false);}}></div>
            <div className={`schedule-detail ${writeOpen || yearMonthOpen || detailOpen ? 'active' : ''}`}>
                {writeOpen && (
                    <>
                        <div className="sched-date">
                            <input type="text" value={selectedDate + ` ` + `(` + selectedDay + `)`} readOnly
                                   id="selectedDate"/>
                        </div>
                        <div className="inner">
                            <ul className="color_list">
                                {colors.map((color, index) => {
                                    const baseClass = index === 0 ? 'bg_pm' : `bg_p0${index + 1}`;
                                    return (
                                        <li
                                            key={index}
                                            className={`${baseClass} ${selectedColorIndex === index ? 'selected' : ''}`}
                                            onClick={() => handleSchedColor(index)}
                                        ></li>
                                    );
                                })}
                            </ul>
                            <p className="fs_md mt_lg">일정 시간</p>
                            <div className='item-flex mt_md'>
                                <input type="time" className='input-time' id="start-time" onChange={(e)=>setStartTime(e.target.value)}/> <p className="fs_md">~</p>
                                <input type="time" className='input-time' id="end-time" onChange={(e)=>setEndTime(e.target.value)}/>
                            </div>
                            <p className="fs_md mt_lg mb_md">휴식 시간</p>
                            <input type="time" className='input-time' id="break-time" onChange={(e)=>setBreakTime(e.target.value)}/>
                            <p className="fs_md mt_lg">메모</p>
                            <textarea className='textarea mt_md fs_md' rows={5} onChange={(e)=>setMemo(e.target.value)}></textarea>
                            <button className="btn btn-max btn-pm fs_md mt_lg" onClick={writeSchedule}>스케줄 등록</button>
                        </div>
                    </>
                )}

                {!writeOpen && yearMonthOpen && (
                    <div className="ym-picker">
                        <div className="year-picker">
                            <button onClick={decreaseYear} className='fs_lg'>{'<'}</button>
                            <p className='fs_lg'>{selectedYear}</p>
                            <button onClick={increaseYear} className='fs_lg'>{'>'}</button>
                        </div>

                        <div className="month-picker">
                            {[...Array(12)].map((_, i) => {
                                const month = i + 1;
                                return (
                                    <div
                                        key={month}
                                        className={`month ${selectedMonth === month ? 'selected' : ''}`}
                                        onClick={() => handleSelect(month)}
                                    >
                                       <p className='fs_lg'> {month.toString().padStart(2, '0')} </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="selected-ym mb_lg">
                            <p className='fs_md'>
                                {selectedYear}년 {selectedMonth.toString().padStart(2, '0')}월
                            </p>
                        </div>
                        <div className="btn-box">
                            <button className='btn btn-md btn-e-f fs_md' onClick={handleCancelYM}>취소</button>
                            <button className='btn btn-md btn-pm-f fs_md' onClick={handleConfirmYM}>확인</button>
                        </div>
                    </div>

                )}

                {!writeOpen && detailOpen && (
                    <>
                        <div className="sched-date">
                            <p className="fs_lg">{selectedSchedule.date} (요일)</p>
                        </div>
                        <div className="inner">
                            <p className="fs_md mt_lg">일정 시간</p>
                            <div className='item-flex mt_md'>
                                <p className="fs_md">{selectedSchedule.startTime}</p>
                                <p className="fs_md">~</p>
                                <p className="fs_md">{selectedSchedule.endTime}</p>
                            </div>

                            <p className="fs_md mt_lg mb_md">휴식 시간</p>
                            <p className="fs_md">
                                {selectedSchedule.breakTime}
                            </p>
                            <p className="fs_md mt_lg">메모</p>
                            <p className='mt_md fs_md'>
                                {selectedSchedule.memo}
                            </p>
                        </div>
                    </>
                )}


            </div>
            <div className="sched-btn" onClick={handleEdit}>
                {writeOpen ? (
                    <img src="/image/icon_close.svg" alt="스케줄 편집 닫기"/>
                ) : (
                    <img src="/image/icon_write.svg" alt="스케줄 편집 열기"/>
                )}
            </div>
        </>
    );
}

export default Calender;