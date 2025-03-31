import axios from "axios";
import {useEffect, useState} from "react";


function ReportAnswer({questionId, reportId, type}) {

    const [responseData, setResponseData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    const getResponse = async () => {
        await axios.get(`http://localhost:8080/reports/read/response/${questionId}`).then((res) => setResponseData(res.data))
    }

    useEffect(() => {
        getResponse();
    }, []);

    const answer = type === "TEXT" || type === "CHOICE" ? responseData.find((r) => r.reportId === reportId)?.answerText || "" :
        type === "TIME" ? responseData.find((r) => r.reportId === reportId)?.startTime || "" :
            type === "DATETIME" ? responseData.find((r) => r.reportId === reportId)?.startDate || "" :
                type === "TIME_RANGE" ? `${responseData.find((r) => r.reportId === reportId)?.startTime} ~ ${responseData.find((r) => r.reportId === reportId)?.endTime}` :
                    type === "DATE_RANGE" ? `${responseData.find((r) => r.reportId === reportId)?.startDate} ~ ${responseData.find((r) => r.reportId === reportId)?.endDate}` : "";

    return (
        <div>
            답변 : {answer}
        </div>
    )

}

export default ReportAnswer