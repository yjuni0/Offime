function SignUpConfirm() {
    return (
        <form onSubmit={login} className="txt-a-c">
            <div className="mt_xlg">
                <input
                    type="email"
                    className=""
                    placeholder="이메일을 입력하세요"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mt_xlg pb_lg">
                <input
                    type="password"
                    className=""
                    placeholder="비밀번호를 입력하세요"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="mlr-a btn btn-pm btn-md">
                이메일로 로그인
            </button>
            <Link to={'/signUp'} className="mlr-a btn btn-pm btn-md">
                회원가입
            </Link>
        </form>
    );
}
export default SignUpConfirm;
