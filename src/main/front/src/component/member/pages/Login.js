import LoginForm from '../form/LoginForm';
import '../../../css/common.css';
import '../../../css/reset.css';

function Login() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <LoginForm />
                </div>
            </div>
        </section>
    );
}

export default Login;
