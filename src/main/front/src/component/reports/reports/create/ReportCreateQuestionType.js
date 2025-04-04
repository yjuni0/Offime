import ReportCreateOptionBlock from "./ReportCreateOptionBlock";
import {useEffect, useState} from "react";
import axios from "axios";
function ReportCreateQuestionType({type, questionId, setResponseData}) {

    const [timeRange, setTimeRange] = useState({startTime: "", endTime: ""});
    const [dateRange, setDateRange] = useState({startDate: "", endDate: ""});
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (!timeRange) return

        console.log(timeRange);

        updateAnswer(questionId, "TIME_RANGE", timeRange);
    }, [timeRange]);

    useEffect(() => {
        if (!dateRange) return
        console.log(dateRange);

        updateAnswer(questionId, "DATE_RANGE", dateRange);
    }, [dateRange]);

    const updateAnswer = (questionId, type, value) => {
        setResponseData((prev) => {
            const exists = prev.find((r) => r.questionId === questionId);
            if(type === "TEXT" || type === "CHOICE") {
                if (exists) {
                    // 이미 있으면 수정
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, answerText: value} : r
                    );
                } else {
                    // 없으면 추가
                    return [...prev, {questionId, answerText: value}];
                }
            } else if (type === "TIME") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startTime: value} : r
                    );
                } else {
                    return [...prev, {questionId, startTime: value}];
                }
            } else if(type === "DATETIME") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startDate: value} : r
                    );
                } else {
                    return [...prev, {questionId, startDate: value}];
                }
            } else if(type === "TIME_RANGE") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startTime: value.startTime, endTime: value.endTime} : r
                    );
                } else {
                    return [...prev, {questionId, startTime: value.startTime, endTime: value.endTime}];
                }
            } else if(type === "DATE_RANGE") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startDate: value.startDate, endDate: value.endDate} : r
                    );
                } else {
                    return [...prev, {questionId, startDate: value.startDate, endDate: value.endDate}];
                }
            }
        });
    };

    const handleFileUpload = async (file, questionId) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("http://localhost:8080/file/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const fileUrl = res.data;

        const fileName = fileUrl.split("/").pop(); // 파일명만 추출
        const finalFileUrl = `http://localhost:8080/file/download/${encodeURIComponent(fileName)}`;
        setPreviewUrl(finalFileUrl);


        // 파일 URL을 responseData에 저장
        setResponseData((prev) => {
            const exists = prev.find((r) => r.questionId === questionId);
            if (exists) {
                return prev.map((r) =>
                    r.questionId === questionId ? { ...r, fileUrl } : r
                );
            } else {
                return [...prev, { questionId, fileUrl }];
            }
        });
    };

    switch (type) {
        case "TEXT":
            return (
                <input
                    type="text"
                    placeholder="입력"
                    className="questionInput"
                    onChange={(e) => updateAnswer(questionId, type, e.target.value)}
                />
            );

        case "CHOICE":
            return (
                <div>
                    <ReportCreateOptionBlock
                        type="radio"
                        questionId={questionId}
                        updateAnswer={updateAnswer}
                    />
                </div>
            );

        case "TIME":
            return (
                <input
                    type="time"
                    className="questionInput"
                    onChange={(e) => updateAnswer(questionId, type, e.target.value)}
                />
            );

        case "TIME_RANGE":
            return (
                <div className="questionInputGroup">
                    <input
                        type="time"
                        className="questionInput"
                        onChange={(e) =>
                            setTimeRange({ ...timeRange, startTime: e.target.value })
                        }
                    />
                    <span>~</span>
                    <input
                        type="time"
                        className="questionInput"
                        onChange={(e) =>
                            setTimeRange({ ...timeRange, endTime: e.target.value })
                        }
                    />
                </div>
            );

        case "DATETIME":
            return (
                <input
                    type="date"
                    className="questionInput"
                    onChange={(e) => updateAnswer(questionId, type, e.target.value)}
                />
            );

        case "DATE_RANGE":
            return (
                <div className="questionInputGroup">
                    <input
                        type="date"
                        className="questionInput"
                        onChange={(e) =>
                            setDateRange({ ...dateRange, startDate: e.target.value })
                        }
                    />
                    <span>~</span>
                    <input
                        type="date"
                        className="questionInput"
                        onChange={(e) =>
                            setDateRange({ ...dateRange, endDate: e.target.value })
                        }
                    />
                </div>
            );

        case "IMAGE":
            return (
                <div style={{
                    width: "100%",
                    padding:"12px 14px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    outline: "none"
                }}>
                    <label htmlFor={`file-input-${questionId}`}>
                        <div style={{backgroundColor:"#2c66d2", width:"2rem", height:"2rem", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <img src="/image/report/imageUpload.png" style={{width:"1rem", filter:"invert(1)"}} alt="이미지 업로드" />
                        </div>
                    </label>
                    <input
                        id={`file-input-${questionId}`}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileUpload(file, questionId);
                        }}
                    />
                    {previewUrl && <img style={{width:"5rem", borderRadius:"15px", marginTop: "1rem"}} src={previewUrl}/>}

                </div>
            );
        case "FILE":
            return (
                <input
                    type="file"
                    className="questionInput"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) handleFileUpload(file, questionId);
                    }}
                />
            );

        case "SECTION":
            return <hr className="mt_lg mb_lg" />;
    }


}

export default ReportCreateQuestionType