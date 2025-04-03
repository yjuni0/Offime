function CalendarHeader({ currentDate, onClick }) {
    return (
        <div className="calendar-header">
            <p id="monthYear" className="cal-month" onClick={onClick}>
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </p>
        </div>
    );
}

export default CalendarHeader;
