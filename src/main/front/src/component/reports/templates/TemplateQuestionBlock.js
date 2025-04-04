import { useState } from "react";
import TemplateQuestionDetail from "./TemplateQuestionDetail";

function TemplateQuestionBlock({ question, questionIndex, updateQuestion }) {
    const [questionList, setQuestionList] = useState(question);

    const updateContent = (value) => {
        const updated = {
            ...questionList,
            content: value,
        };
        setQuestionList(updated);
        updateQuestion(questionIndex, updated);
    };

    const updateType = (value) => {
        const updated = {
            ...questionList,
            type: value,
        };
        setQuestionList(updated);
        updateQuestion(questionIndex, updated);
    };

    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
                flexWrap: "wrap"
            }}>
                {questionList.type !== "SECTION" && (
                    <input
                        type="text"
                        placeholder="질문 입력"
                        value={questionList.content}
                        onChange={(e) => updateContent(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "8px 12px",
                            fontSize: "14px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            outline: "none",
                            transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#ccc'}
                    />
                )}
                <select
                    value={questionList.type}
                    onChange={(e) => updateType(e.target.value)}
                    style={{
                        padding: "8px 12px",
                        fontSize: "14px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        cursor: "pointer"
                    }}
                >
                    <option value="TEXT">텍스트박스</option>
                    <option value="CHOICE">객관식</option>
                    <option value="TIME">시각</option>
                    <option value="TIME_RANGE">시간</option>
                    <option value="DATETIME">날짜</option>
                    <option value="DATE_RANGE">기간</option>
                    <option value="IMAGE">사진</option>
                    <option value="FILE">문서</option>
                    <option value="SECTION">섹션</option>
                </select>
            </div>
            <div>
                <TemplateQuestionDetail
                    type={questionList.type}
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    questionIndex={questionIndex}
                    updateQuestion={updateQuestion}
                />
            </div>
        </div>
    );
}

export default TemplateQuestionBlock;
