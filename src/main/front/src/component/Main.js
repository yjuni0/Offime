import Router from "./router/Router";

import { useContext, useEffect } from "react";
import { redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
function Main() {
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
              <Router />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Main;
