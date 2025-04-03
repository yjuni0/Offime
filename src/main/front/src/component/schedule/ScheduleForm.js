function ScheduleForm({
                          selectedDate, selectedDay, colors, selectedColorIndex,
                          handleSchedColor, setStartTime, setEndTime, setBreakTime, setMemo, writeSchedule
                      }) {


    return (
        <>
            <div className="sched-date">
                <input type="text" value={selectedDate + ` ` + `(` + selectedDay + `)`} readOnly id="selectedDate" />
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
                    <input type="time" className='input-time' id="start-time" onChange={(e) => setStartTime(e.target.value)} /> <p className="fs_md">~</p>
                    <input type="time" className='input-time' id="end-time" onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <p className="fs_md mt_lg mb_md">휴식 시간</p>
                <input type="time" className='input-time' id="break-time" onChange={(e) => setBreakTime(e.target.value)} />
                <p className="fs_md mt_lg">메모</p>
                <textarea className='textarea mt_md fs_md' rows={5} onChange={(e) => setMemo(e.target.value)}></textarea>
                <button className="btn btn-max btn-pm fs_md mt_lg" onClick={writeSchedule}>스케줄 등록</button>
            </div>
        </>
    );
}

export default ScheduleForm;
