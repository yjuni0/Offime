import { Link } from "react-router-dom";
<<<<<<< HEAD
import PendingExpensesCount from "./expense/PendingExpensesCount ";
import MainNav from "./header/MainNav";
=======
import MainNav from "./header/MainNav";
import Sse from "./notification/useSseEffect";
>>>>>>> 4b2c3ec93060f2f4fdf9c609a163c566cb3b1a9f

function Home() {
  return (
    <>
      <MainNav />
      <h1>Check</h1>
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
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/attendance/manager"}>출퇴근</Link>
        </button>
<<<<<<< HEAD
=======
        <Sse />
>>>>>>> 4b2c3ec93060f2f4fdf9c609a163c566cb3b1a9f
      </div>
    </>
  );
}

export default Home;
