import { BrowserRouter } from 'react-router-dom';
import Main from './component/Main';
import AuthProvider from './component/context/AuthProvider';
import HttpHeadersProvider from './component/context/HttpHeadersProvider';

import './css/reset.css';
import './css/common.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <HttpHeadersProvider>
                        <Main />
                    </HttpHeadersProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
