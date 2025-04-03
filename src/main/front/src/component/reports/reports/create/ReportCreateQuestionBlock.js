import { useEffect, useState } from "react";
import axios from "axios";
import ReportCreateQuestionType from "./ReportCreateQuestionType";

function ReportCreateQuestionBlock({ templateId, responseData, setResponseData }) {
    const [questionList, setQuestionList] = useState([]);

    const getQuestionList = async () => {
        await axios
            .get(`http://localhost:8080/reports/template/${templateId}/questions`)
            .then((res) => setQuestionList(res.data));
    };

    useEffect(() => {
        getQuestionList();
    }, []);

    return (
        <div>
            {questionList.map((question) => {
                if (question.type === "SECTION") {
                    return (
                        <div
                            key={question.order}
                            style={{
                                margin: "2rem 0",
                                textAlign: "center",
                            }}
                        >
                            <hr
                                style={{
                                    border: "none",
                                    height: "2px",
                                    backgroundColor: "#ddd",
                                    marginBottom: "0.5rem",
                                }}
                            />
                            <div
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: "#888",
                                }}
                            >
                                {question.questionText}
                            </div>
                            <hr
                                style={{
                                    border: "none",
                                    height: "2px",
                                    backgroundColor: "#ddd",
                                    marginTop: "0.5rem",
                                }}
                            />
                        </div>
                    );
                }

                // 일반 질문인 경우 카드 스타일
                return (
                    <div
                        key={question.order}
                        style={{
                            marginBottom: "1.5rem",
                            padding: "1rem",
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "bold",
                                marginBottom: "0.75rem",
                                fontSize: "1rem",
                            }}
                        >
                            {question.questionText}
                        </div>
                        <ReportCreateQuestionType
                            type={question.type}
                            questionId={question.id}
                            setResponseData={setResponseData}
                        />
                    </div>
                );
            })}
        </div>
    );

}

export default ReportCreateQuestionBlock;
