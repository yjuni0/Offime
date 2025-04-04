import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function TemplateDetail() {
    const [questionData, setQuestionData] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [template, setTemplate] = useState({});

    const { templateId } = useParams();

    const getTemplate = async () => {
        const res = await axios.get(`http://localhost:8080/reports/template/${templateId}`);
        setTemplate(res.data);
    }

    const getQuestionList = async () => {
        const res = await axios.get(`http://localhost:8080/reports/template/${templateId}/questions`);
        setQuestionData(res.data);
    };

    const getOptionList = async (questionId) => {
        const res = await axios.get(`http://localhost:8080/reports/template/questions/${questionId}`);
        setOptionList((prev) => [...prev, [questionId, res.data]]);
    };

    useEffect(() => {
        if (!templateId) return;
        getTemplate();
        getQuestionList();
    }, [templateId]);

    useEffect(() => {
        if (!questionData.length) return;
        questionData.forEach((q) => getOptionList(q.id));
    }, [questionData]);

    const navigate = useNavigate();

    return (
        <section className="reportCreateContainer">
            <div className="reportCreateInner">
                <img style={{cursor: "pointer", width: "1.5rem", display: "inline"}}
                     src={"/image/report/backArrow.png"}
                     onClick={() => navigate(-1)}/>
                <p className="replyTitle">{template.title}</p>
                <div className="item">
                    {questionData.map((q) =>
                        q.type === "SECTION" ? (
                            <hr key={q.id} className="questionDivider"/>
                        ) : (
                            <div key={q.id} className="reportQuestionBox">
                                <p className="questionLabel">{q.questionText}</p>

                                {q.type === "TEXT" && <input className="questionInput" value={""} disabled/>}

                                {q.type === "CHOICE" && (
                                    <div>
                                        {optionList.find((o) => o[0] === q.id)?.[1].map((o) => (
                                            <label
                                                key={o}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    backgroundColor: "#f9f9f9",
                                                    padding: "10px 14px",
                                                    borderRadius: "8px",
                                                    fontSize: "1rem",
                                                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                                                    margin: "1rem 0"
                                                }}
                                            >
                                                <input type="radio" disabled/>
                                                {o}
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {q.type === "TIME" && <input type="time" className="questionInput" disabled/>}
                                {q.type === "DATETIME" && <input type="date" className="questionInput" disabled/>}

                                {q.type === "TIME_RANGE" && (
                                    <div className="questionInputGroup">
                                        <input type="time" className="questionInput" disabled/>
                                        <span>~</span>
                                        <input type="time" className="questionInput" disabled/>
                                    </div>
                                )}

                                {q.type === "DATE_RANGE" && (
                                    <div className="questionInputGroup">
                                        <input type="date" className="questionInput" disabled/>
                                        <span>~</span>
                                        <input type="date" className="questionInput" disabled/>
                                    </div>
                                )}

                                {q.type === "FILE" && (
                                    <div>
                                        <input type="file" disabled/>
                                    </div>
                                )}

                                {q.type === "IMAGE" && (
                                    <div
                                        style={{
                                            width: "100%",
                                            padding: "12px 14px",
                                            border: "none",
                                            borderRadius: "8px",
                                            backgroundColor: "#f9f9f9",
                                            fontSize: "1rem",
                                            boxSizing: "border-box",
                                            outline: "none"
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: "#2c66d2",
                                                width: "2rem",
                                                height: "2rem",
                                                borderRadius: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginBottom: "0.5rem"
                                            }}
                                        >
                                            <img
                                                src="/image/report/imageUpload.png"
                                                style={{width: "1rem", filter: "invert(1)"}}
                                                alt="이미지 업로드"
                                            />
                                        </div>
                                        <input type="file" accept="image/*" style={{display: "none"}} disabled/>
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export default TemplateDetail;