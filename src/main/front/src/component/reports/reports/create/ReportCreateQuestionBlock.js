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
            {questionList.map((question) => (
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
                    {question.type !== "SECTION" && (
                        <div
                            style={{
                                fontWeight: "bold",
                                marginBottom: "0.75rem",
                                fontSize: "1rem",
                            }}
                        >
                            {question.questionText}
                        </div>
                    )}
                    <div style={{backgroundColor:"lightgray", borderRadius: "10px"}}>
                    <ReportCreateQuestionType
                        type={question.type}
                        questionId={question.id}
                        setResponseData={setResponseData}
                    />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReportCreateQuestionBlock;
