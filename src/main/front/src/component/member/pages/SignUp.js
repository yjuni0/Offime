import SignUpForm from '../form/SignUpForm';

function SignUp() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <h3>회원가입</h3>
                    <SignUpForm />
                </div>
            </div>
        </section>
    );
}

export default SignUp;
