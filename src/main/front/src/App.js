import {BrowserRouter} from "react-router-dom";
import Main from "./component/reports/Main";

import "./css/reset.css";
import "./css/common.css";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </div>
  );
}

export default App;
