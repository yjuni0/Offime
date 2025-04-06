import { Link } from "react-router-dom";
import ExpensesCount from "./expense/ExpensesCount ";
import useSse from "./notification/hooks/useSse";
import CommonNav from "../component/header/CommonNav";
import { ToastContainer } from "react-toastify";
import NotificationToast from "./notification/NotificationToast";
function Home() {
  const messages = useSse();

  return (
    <>
      <CommonNav messages={messages} />
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
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/vacation"}>휴가</Link>
        </button>
        <ExpensesCount />
        <ToastContainer
          autoClose={3000}
          position="top-center"
          hideProgressBar="false"
          closeOnClick="true"
          draggable="true"
        />
        <NotificationToast messages={messages} />
      </div>
    </>
  );
}
export default Home;
