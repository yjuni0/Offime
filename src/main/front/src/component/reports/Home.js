import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to={"/templates/create"}>템플릿 만들기</Link>
            <Link to={"/reports/templateList"}>보고서 만들기</Link>
        </div>
    )
}

export default Home;