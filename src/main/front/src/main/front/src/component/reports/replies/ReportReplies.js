import ReportRepliesList from "./ReportRepliesList";
import ReportRepliesWrite from "./ReportRepliesWrite";
import {useParams} from "react-router-dom";


function ReportReplies() {

    const reportId = useParams().reportId

    return (
        <>
                        <section className={"sec"}>
                            <div className={"inner"}>
                                <ReportRepliesList reportId={reportId}/>
                                <ReportRepliesWrite reportId={reportId}/>
                            </div>
                        </section>

        </>
    )
}

export default ReportReplies