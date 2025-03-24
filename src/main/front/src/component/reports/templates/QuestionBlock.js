import {useEffect, useState} from "react";
import OptionBlock from "./OptionBlock";


function QuestionBlock({question, questionIndex, updateQuestion}) {

    const [questionList, setQuestionList] = useState(question);

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

    const updateContent = (value) => {
        const updated = {
            ...questionList,
            content: value,
        };
        setQuestionList(updated);
        updateQuestion(questionIndex, updated);
    };

    return (
        <div>
            <h1>QuestionBlock {question.id}</h1>
            <input placeholder={"질문 입력"} type={"text"} value={questionList.content} onChange={(e) => updateContent(e.target.value)}/>
            {questionList.optionList.map((option, optionIndex) => (
                <OptionBlock
                    key={optionIndex}
                    value={option}
                    onChange={(value) => {
                        updateOption(optionIndex, value);
                    }}
                />
            ))}
            <button type={"button"} onClick={() => addOption()}>옵션 추가</button>
        </div>
    );
}

export default QuestionBlock;