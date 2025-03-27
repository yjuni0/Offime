import {useEffect, useState} from "react";
import TemplateQuestionDetail from "./TemplateQuestionDetail";


function TemplateQuestionBlock({question, questionIndex, updateQuestion}) {

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
        <div className={"item"}>
            <h1>QuestionBlock {question.id}</h1>
            <div>
                <input className={"input-txt"} placeholder={"질문 입력"} type={"text"} value={questionList.content}
                       onChange={(e) => updateContent(e.target.value)}/>
                <select className={"select"} value={questionList.type} onChange={(e) => updateType(e.target.value)}>
                    <option value={"TEXT"}>텍스트박스</option>
                    <option value={"CHOICE"}>객관식</option>
                    <option value={"MULTIPLE_CHOICE"}>체크박스</option>
                    <option value={"TIME"}>시각</option>
                    <option value={"TIME_RANGE"}>시간</option>
                    <option value={"DATETIME"}>날짜</option>
                    <option value={"DATE_RANGE"}>기간</option>
                    <option value={"EMPLOYEE_SELECT"}>직원</option>
                    <option value={"IMAGE"}>사진</option>
                    <option value={"FILE"}>문서</option>
                    <option value={"SECTION"}>섹션</option>
                </select>
            </div>
            <div>
                <TemplateQuestionDetail type={questionList.type} questionList={questionList} setQuestionList={setQuestionList} questionIndex={questionIndex} updateQuestion={updateQuestion}/>
            </div>
        </div>
    );
}

export default TemplateQuestionBlock;