import {Link} from "react-router-dom";

function ForCheck() {
    return (
        <div id={"container"}>
            <div id={"device"}>
                <main id={"main"}>
                    <section className={"sec"}>
                        <div className={"inner"}>
                            <div className={"item mlr-a txt-a-c"}>
                                <h1>Check</h1>
                            </div>
                            <div className={"item mlr-a"}>
                                <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
                                    <Link to={"/templates/create"}>템플릿 만들기</Link>
                                </button>
                                <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
                                    <Link to={"/templates/list"}>템플릿 리스트</Link>
                                </button>
                                <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
                                    <Link to={"/reports/templateList"}>보고서 만들기</Link>
                                </button>
                                <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
                                    <Link to={"/reports/read"}>보고서 리스트</Link>
                                </button>

                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>


    )
}

export default ForCheck;