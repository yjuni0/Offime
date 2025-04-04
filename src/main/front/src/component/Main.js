import Router from "./router/Router";
import useSse from "./notification/hooks/useSse";
import CommonNav from "../component/header/CommonNav";
import { ToastContainer } from "react-toastify";
import NotificationToast from "./notification/NotificationToast";
import { useContext, useEffect } from "react";
import { redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
function Main() {
  const messages = useSse();
  const auth = useContext(AuthContext);
  useEffect(() => {
    if (!auth) {
      redirect("/");
    }
  });
  return (
    <div id={"container"}>
      <div id={"device"}>
        <main id={"main"}>
          <section className={"sec"}>
            <div className={"inner"}>
              <CommonNav messages={messages} />
              <Router />
              <ToastContainer
                autoClose={3000}
                position="top-center"
                hideProgressBar="false"
                closeOnClick="true"
                draggable="true"
              />
              <NotificationToast messages={messages} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Main;
