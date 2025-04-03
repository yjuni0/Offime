function ScheduleDetail({ onClose, onEdit, selectedSchedule }) {

    const getDayOfWeek = (dateString) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    return (
        <>
            <div className="sched-date">
                <p className="fs_lg">{selectedSchedule.date}  ({getDayOfWeek(selectedSchedule.date)})</p>
            </div>
            <div className="inner">
                <p className="fs_md mt_lg">일정 시간</p>
                <div className='item-flex mt_md'>
                    <p className="fs_md">{selectedSchedule.startTime}</p>
                    <p className="fs_md">~</p>
                    <p className="fs_md">{selectedSchedule.endTime}</p>
                </div>

                <p className="fs_md mt_lg mb_md">휴식 시간</p>
                <p className="fs_md">{selectedSchedule.breakTime}</p>

                <p className="fs_md mt_lg">메모</p>
                <p className='mt_md fs_md'>{selectedSchedule.memo}</p>
                <div className="item-flex mt_lg">
                    <button
                        className="btn fs_md btn-lg btn-e-f"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                    <button
                        className="btn fs_md btn-lg btn-pm"
                        onClick={onEdit}
                    >
                        스케줄 수정
                    </button>
                </div>
            </div>
        </>
    );
}

export default ScheduleDetail;
