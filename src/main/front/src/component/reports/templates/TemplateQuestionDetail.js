import TemplateOptionBlock from "./TemplateOptionBlock";
import {useEffect, useState} from "react";

function TemplateQuestionDetail({type ,questionList, setQuestionList, questionIndex, updateQuestion}) {

    // useEffect(() => {
    //     console.log("질문 칸")
    //     console.log(questionList)
    // }, [questionList]);

    const updateOption = (optionIndex, value) => {
        const newOptions = [...questionList.optionList];
        newOptions[optionIndex] = value;

        const updated = {
            ...questionList,
            optionList: newOptions,
        };
        setQuestionList(updated);
        updateQuestion(questionIndex, updated);
    };

    const addOption = () => {
        const updated = {
            ...questionList,
            optionList: [...questionList.optionList, ""],
        };
        setQuestionList(updated);
        updateQuestion(questionIndex, updated);
    };

    switch (type) {
        case "TEXT" :
            return <input className={"input-txt"} placeholder={"텍스트박스"} disabled={true}/>
        case "CHOICE" :
            return (
                <>
                    {questionList.optionList.map((option, optionIndex) => (
                        <div>
                            <TemplateOptionBlock
                                key={optionIndex}
                                value={option}
                                type={"radio"}
                                onChange={(value) => {
                                    updateOption(optionIndex, value);
                                }}
                            />
                        </div>
                    ))}
                    <button type={"button"} onClick={() => addOption()}>옵션 추가</button>
                </>
            )
        case "MULTIPLE_CHOICE" :
            return (
                <>
                    {questionList.optionList.map((option, optionIndex) => (
                        <div>
                            <TemplateOptionBlock
                                key={optionIndex}
                                value={option}
                                type={"checkbox"}
                                onChange={(value) => {
                                    updateOption(optionIndex, value);
                                }}
                            />
                        </div>
                    ))}
                    <button type={"button"} onClick={() => addOption()}>옵션 추가</button>
                </>
            )
        case "TIME" :
            return <input placeholder={"시각"} disabled={true}/>
        case "TIME_RANGE" :
            return <input placeholder={"시간"} disabled={true}/>
        case "DATETIME" :
            return <input placeholder={"날짜"} disabled={true}/>
        case "DATE_RANGE" :
            return <input placeholder={"기간"} disabled={true}/>
        case "EMPLOYEE_SELECT" :
            return <input placeholder={"직원"} disabled={true}/>
        case "IMAGE" :
            return <input placeholder={"사진"} disabled={true}/>
        case "FILE" :
            return <input placeholder={"문서"} disabled={true}/>
        case "SECTION" :
            return <input placeholder={"섹션"} disabled={true}/>
    }
}

export default TemplateQuestionDetail;