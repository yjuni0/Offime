import LoginForm from '../form/LoginForm';
import '../../../css/common.css';
import '../../../css/reset.css';

function Login() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <p className="txt-a-c mt_xlg title-lg">Offime 로고</p>
                    <LoginForm />
                </div>
            </div>
        </section>
    );
}

export default Login;
