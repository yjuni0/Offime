import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ReportUpdate() {
    // 제목, 각 질문당 답변 수정 해야함.

    const [title, setTitle] = useState("")
    const [templateId, setTemplateId] = useState("")
    const [responseData, setResponseData] = useState([])
    const [questionData, setQuestionData] = useState([])
    const [optionList, setOptionList] = useState([])

    const reportId = useParams().reportId

    const navigate = useNavigate();


    const getReport = async () => {
        await axios.get(`http://localhost:8080/reports/read/${reportId}`).then((res) => {
            setTitle(res.data.title);
            setTemplateId(res.data.templateId);
        });
    }

    const getQuestionList = async () => {
        await axios.get(`http://localhost:8080/reports/template/${templateId}/questions`).then((res) => setQuestionData(res.data))
    }

    const getResponse = async (questionId) => {
        await axios.get(`http://localhost:8080/reports/read/response/${questionId}/${reportId}`).then((res) => setResponseData((prev) => [...prev, res.data]))
    }

    const getOptionList = async (questionId) => {
        await axios.get(`http://localhost:8080/reports/template/questions/${questionId}`).then((res) => setOptionList((prev) => [...prev, [questionId, res.data]]))
    }

    useEffect(() => {
        getReport();
    }, []);

    useEffect(() => {
        if (templateId === "") return

        getQuestionList()
    }, [templateId]);

    useEffect(() => {
        if (questionData === "") return

        console.log(questionData);
        questionData.map((q) => (q.type !== "SECTION") && getResponse(q.id))
        questionData.map((q) => getOptionList(q.id))

    }, [questionData]);

    useEffect(() => {

        console.log(responseData)
    }, [responseData]);


    useEffect(() => {

        console.log(optionList)
    }, [optionList]);
    const updateReport = async () => {
        const data = {
            title, responseData
        }

        await axios.put(`http://localhost:8080/reports/update/${reportId}`, data);
    }

    return (

        <section className={"sec"}>
            <div className={"inner"}>
                <div className={"item"}>
                    <form onSubmit={updateReport}>
                        <p>제목</p>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                        {questionData.map((q) => (
                            <div key={q.id}>
                                <p>{q.questionText}</p>
                                {q.type === "TEXT" &&
                                    <input
                                        value={responseData && responseData.find((r) => r.questionId === q.id)?.answerText}
                                        onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {
                                            ...r,
                                            answerText: e.target.value
                                        } : r))}/>}
                                {q.type === "CHOICE" && <> {
                                    optionList.find((o) => o[0] === q.id)?.[1].map((o) => (
                                        <div key={o}>
                                            <input type={"radio"} name={`question-${q.id}`} value={o}
                                                   checked={o === (responseData && responseData.find((r) => r.questionId === q.id)?.answerText)}
                                                   onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {
                                                       ...r,
                                                       answerText: e.target.value
                                                   } : r))}/>
                                            {o}
                                        </div>
                                    ))
                                }
                                </>}
                                {q.type === "TIME" && <input
                                    type={"time"}
                                    value={responseData && responseData.find((r) => r.questionId === q.id)?.startTime}
                                    onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {
                                        ...r,
                                        startTime: e.target.value
                                    } : r))}/>}

                                {q.type === "DATETIME" && <input
                                    type={"date"}
                                    value={responseData && responseData.find((r) => r.questionId === q.id)?.startDate}
                                    onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {
                                        ...r,
                                        startDate: e.target.value
                                    } : r))}/>}

                                {q.type === "TIME_RANGE" && <><input
                                    type={"time"}
                                    value={responseData && responseData.find((r) => r.questionId === q.id)?.startTime}
                                    onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {
                                        ...r,
                                        startTime: e.target.value} : r))}/> ~
                                    <input type={"time"}

                                    value={responseData && responseData.find((r) => r.questionId === q.id)?.endTime}
                                    onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {...r, endTime: e.target.value} : r))}/></>}

                                {q.type === "DATE_RANGE" && <><input
                                    type={"date"}
                                    value={responseData && responseData.find((r) => r.questionId === q.id)?.startDate}
                                    onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {...r, startDate: e.target.value} : r))}/> ~
                                    <input
                                        type={"date"}
                                        value={responseData && responseData.find((r) => r.questionId === q.id)?.endDate}
                                        onChange={(e) => setResponseData((prev) => prev.map((r) => r.questionId === q.id ? {...r, endDate: e.target.value} : r))}/></>}

                                {q.type === "SECTION" && <hr className={"mt_lg mb_lg"}/>}
                            </div>
                        ))}
                        <button type={"submit"} onClick={() => navigate(`/reports/read/${reportId}`)}>수정</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ReportUpdate