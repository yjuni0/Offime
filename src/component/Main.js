import Router from "./router/Router";

function Main() {
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
