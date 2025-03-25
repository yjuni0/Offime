import ReportCreateOptionBlock from "./ReportCreateOptionBlock";

function reportCreateQuestionType ({type, questionId, setResponseData}) {


    switch (type) {
        case "TEXT" :
            return <input type={"text"} onChange={ (e) => setResponseData(e.target.value)}/>
        case "CHOICE" :
            return (
            <div>
                <h1>ReportCreateQuestionType</h1>
                <ReportCreateOptionBlock type={"radio"} questionId={questionId}/>
            </div>
        )
        case "MULTIPLE_CHOICE" :
            return (
                <div>
                    <h1>ReportCreateQuestionType</h1>
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