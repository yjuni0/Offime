import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ReportUpdate() {
    const [title, setTitle] = useState("")
    const [templateId, setTemplateId] = useState("")
    const [responseData, setResponseData] = useState([])
    const [questionData, setQuestionData] = useState([])
    const [optionList, setOptionList] = useState([])

    const reportId = useParams().reportId
    const navigate = useNavigate();

    const getReport = async () => {
        await axios.get(`http://localhost:8080/reports/read/${reportId}`).then((res) => {
            setTitle(res.data.title);
            setTemplateId(res.data.templateId);
        });
    }

    const getQuestionList = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}/questions`).then((res) => setQuestionData(res.data))
    }

    const getResponse = async (questionId) => {
        await axios.get(`http://localhost:8080/reports/read/response/${questionId}/${reportId}`).then((res) => setResponseData((prev) => [...prev, res.data]))
    }

    const getOptionList = async (questionId) => {
        await axios.get(`http://localhost:8080/reports/template/questions/${questionId}`).then((res) => setOptionList((prev) => [...prev, [questionId, res.data]]))
    }

    useEffect(() => {
        getReport();
    }, []);

    useEffect(() => {
        if (templateId === "") return
        getQuestionList()
    }, [templateId]);

    useEffect(() => {
        if (questionData === "") return
        questionData.map((q) => (q.type !== "SECTION") && getResponse(q.id))
        questionData.map((q) => getOptionList(q.id))
    }, [questionData]);

    const updateReport = async () => {
        const data = { title, responseData }
        await axios.put(`http://localhost:8080/reports/update/${reportId}`, data);
    }

    const handleFileChange = async (e, questionId) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post("http://localhost:8080/file/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const fileUrl = res.data;
            setResponseData((prev) => prev.map((r) => r.questionId === questionId ? { ...r, fileUrl } : r));
        } catch (err) {
            console.error("파일 업로드 실패", err);
        }
    };

    return (
        <section className="reportCreateContainer">
            <div className="reportCreateInner">
                <div className="item">
                    <form onSubmit={updateReport}>
                        <input
                            className="reportCreateInput"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {questionData.map((q) =>
                            q.type === "SECTION" ? (
                                <hr key={q.id} className="questionDivider" />
                            ) : (
                                <div key={q.id} className="reportQuestionBox">
                                    <p className="questionLabel">{q.questionText}</p>

                                    {q.type === "TEXT" && (
                                        <input
                                            className="questionInput"
                                            value={responseData.find((r) => r.questionId === q.id)?.answerText || ''}
                                            onChange={(e) =>
                                                setResponseData((prev) =>
                                                    prev.map((r) =>
                                                        r.questionId === q.id
                                                            ? { ...r, answerText: e.target.value }
                                                            : r
                                                    )
                                                )
                                            }
                                        />
                                    )}

                                    {q.type === "CHOICE" && (
                                        <div>
                                            {optionList
                                                .find((o) => o[0] === q.id)?.[1]
                                                .map((o) => (
                                                    <div key={o}>
                                                        <label
                                                            key={o}
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "0.5rem",
                                                                backgroundColor: "#f9f9f9",
                                                                padding: "10px 14px",
                                                                borderRadius: "8px",
                                                                cursor: "pointer",
                                                                fontSize: "1rem",
                                                                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                                                                margin:"1rem 0"
                                                            }}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`question-${q.id}`}
                                                                value={o}
                                                                checked={
                                                                    o === responseData.find((r) => r.questionId === q.id)?.answerText
                                                                }
                                                                onChange={(e) =>
                                                                    setResponseData((prev) =>
                                                                        prev.map((r) =>
                                                                            r.questionId === q.id
                                                                                ? {...r, answerText: e.target.value}
                                                                                : r
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                            {o}
                                                        </label>
                                                    </div>
                                                ))}
                                        </div>
                                    )}

                                    {q.type === "TIME" && (
                                        <input
                                            type="time"
                                            className="questionInput"
                                            value={responseData.find((r) => r.questionId === q.id)?.startTime || ''}
                                            onChange={(e) =>
                                                setResponseData((prev) =>
                                                    prev.map((r) =>
                                                        r.questionId === q.id
                                                            ? { ...r, startTime: e.target.value }
                                                            : r
                                                    )
                                                )
                                            }
                                        />
                                    )}

                                    {q.type === "DATETIME" && (
                                        <input
                                            type="date"
                                            className="questionInput"
                                            value={responseData.find((r) => r.questionId === q.id)?.startDate || ''}
                                            onChange={(e) =>
                                                setResponseData((prev) =>
                                                    prev.map((r) =>
                                                        r.questionId === q.id
                                                            ? { ...r, startDate: e.target.value }
                                                            : r
                                                    )
                                                )
                                            }
                                        />
                                    )}

                                    {q.type === "TIME_RANGE" && (
                                        <div className="questionInputGroup">
                                            <input
                                                type="time"
                                                className="questionInput"
                                                value={responseData.find((r) => r.questionId === q.id)?.startTime || ''}
                                                onChange={(e) =>
                                                    setResponseData((prev) =>
                                                        prev.map((r) =>
                                                            r.questionId === q.id
                                                                ? { ...r, startTime: e.target.value }
                                                                : r
                                                        )
                                                    )
                                                }
                                            />
                                            <span>~</span>
                                            <input
                                                type="time"
                                                className="questionInput"
                                                value={responseData.find((r) => r.questionId === q.id)?.endTime || ''}
                                                onChange={(e) =>
                                                    setResponseData((prev) =>
                                                        prev.map((r) =>
                                                            r.questionId === q.id
                                                                ? { ...r, endTime: e.target.value }
                                                                : r
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {q.type === "DATE_RANGE" && (
                                        <div className="questionInputGroup">
                                            <input
                                                type="date"
                                                className="questionInput"
                                                value={responseData.find((r) => r.questionId === q.id)?.startDate || ''}
                                                onChange={(e) =>
                                                    setResponseData((prev) =>
                                                        prev.map((r) =>
                                                            r.questionId === q.id
                                                                ? { ...r, startDate: e.target.value }
                                                                : r
                                                        )
                                                    )
                                                }
                                            />
                                            <span>~</span>
                                            <input
                                                type="date"
                                                className="questionInput"
                                                value={responseData.find((r) => r.questionId === q.id)?.endDate || ''}
                                                onChange={(e) =>
                                                    setResponseData((prev) =>
                                                        prev.map((r) =>
                                                            r.questionId === q.id
                                                                ? { ...r, endDate: e.target.value }
                                                                : r
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {q.type === "FILE" && (
                                        <div>
                                            <input type="file" onChange={(e) => handleFileChange(e, q.id)} />
                                        </div>
                                    )}

                                    {q.type === "IMAGE" && (
                                        <div style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            border: "none",
                                            borderRadius: "8px",
                                            backgroundColor: "#f9f9f9",
                                            fontSize: "1rem",
                                            boxSizing: "border-box",
                                            outline: "none"
                                        }}>

                                            <label htmlFor={`file-input-${q.id}`}>
                                                <div style={{
                                                    backgroundColor: "#2c66d2",
                                                    width: "2rem",
                                                    height: "2rem",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginBottom: "0.5rem"
                                                }}>
                                                    <img src="/image/report/imageUpload.png"
                                                         style={{width: "1rem", filter: "invert(1)"}} alt="이미지 업로드"/>
                                                </div>
                                            </label>
                                            <input
                                                id={`file-input-${q.id}`}
                                                type="file"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={(e) => handleFileChange(e, q.id)}
                                            />
                                            {(() => {
                                                const fileUrl = responseData.find((r) => r.questionId === q.id)?.fileUrl;
                                                const fileName = fileUrl ? fileUrl.split("/").pop() : "";
                                                const downloadUrl = fileName
                                                    ? `http://localhost:8080/file/download/${encodeURIComponent(fileName)}`
                                                    : "";
                                                return (
                                                    downloadUrl && (
                                                        <img
                                                            src={downloadUrl}
                                                            alt="업로드된 이미지"
                                                            style={{
                                                                width: "5rem",
                                                                marginBottom: "0.5rem",
                                                                borderRadius: "15px"
                                                            }}
                                                        />
                                                    )
                                                );
                                            })()}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                        <button
                            type="submit"
                            className="reportCreateSubmit"
                            onClick={() => navigate(`/reports/read/${reportId}`)}
                        >
                            수정
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ReportUpdate;
