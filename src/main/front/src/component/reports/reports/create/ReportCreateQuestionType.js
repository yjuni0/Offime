import ReportCreateOptionBlock from "./ReportCreateOptionBlock";
import {useEffect} from "react";

function reportCreateQuestionType ({type, questionId,setResponseData}) {

    const updateAnswer = (questionId, value) => {
        setResponseData((prev) => {
            const exists = prev.find((r) => r.questionId === questionId);

            if (exists) {
                // 이미 있으면 수정
                return prev.map((r) =>
                    r.questionId === questionId ? { ...r, answerText: value } : r
                );
            } else {
                // 없으면 추가
                return [...prev, { questionId, answerText: value }];
            }
        });
    };

    switch (type) {
        case "TEXT" :
            return <input className={"mlr-a input-txt mt_md input-max"} type={"text"} placeholder={"입력"} onChange={ (e) => updateAnswer(questionId, e.target.value)}/>
        case "CHOICE" :
            return (
                <div>
                    <ReportCreateOptionBlock type={"radio"} questionId={questionId} updateAnswer={updateAnswer} />
                </div>
            )
        case "MULTIPLE_CHOICE" :
            return (
                <div>
                    <ReportCreateOptionBlock type={"checkbox"} questionId={questionId}/>
                </div>
            )
        case "TIME" :
            return
        case "TIME_RANGE" :
            return
        case "DATETIME" :
            return
        case "DATE_RANGE" :
            return
        case "EMPLOYEE_SELECT" :
            return
        case "IMAGE" :
            return
        case "FILE" :
            return
        case "SECTION" :
            return
    }


}

export default reportCreateQuestionType