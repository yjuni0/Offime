import { useEffect, useState } from "react";
import axios from "axios";

function ReportCreateOptionBlock({ type, questionId, updateAnswer }) {
    const [optionList, setOptionList] = useState([]);

    const getOptionList = async () => {
        await axios
            .get(`http://localhost:8080/reports/template/questions/${questionId}`)
            .then((res) => setOptionList(res.data));
    };

    useEffect(() => {
        getOptionList();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {optionList.map((option, index) => (
                <label
                    key={index}
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
                    }}
                >
                    <input
                        type={type}
                        name={`question-${questionId}`}
                        value={option}
                        onChange={(e) => updateAnswer(questionId, "CHOICE", e.target.value)}
                        style={{ cursor: "pointer" }}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}

export default ReportCreateOptionBlock;
