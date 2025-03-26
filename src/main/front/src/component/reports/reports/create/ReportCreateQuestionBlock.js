import {useEffect, useState} from "react";
import axios from "axios";
import ReportCreateQuestionType from "./ReportCreateQuestionType";

function ReportCreateQuestionBlock ({templateId, responseData, setResponseData}) {

    const [questionList, setQuestionList] = useState([]);

    const getQuestionList = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}/questions`)
            .then(res => setQuestionList(res.data));

    }

    useEffect(() => {
        getQuestionList();
    }, []);

    return(
        <div>
            {questionList.map((question) => (
                <div key={question.order}>
                    <div>질문 : {question.questionText}</div>
                    <ReportCreateQuestionType type={question.type} questionId={question.id} setResponseData={setResponseData}/>
                </div>
            ))}
        </div>
    )
}

export default ReportCreateQuestionBlock;
