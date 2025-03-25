import './App.css';
import {BrowserRouter} from "react-router-dom";
import Main from "./component/reports/Main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
