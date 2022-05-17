import React, {useState} from 'react'
import * as S from './style'
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const getLoginInfo = async (
        email: string,
        password: string
    ) => {
        try {
            const data = {
                email: email,
                password: password,
            };
            const response = await axios.post(
                "http://localhost:8080/api/owner/login",
                data,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            );
            const cookies = response.headers['set-cookie'];
            console.log(cookies)
            // setCookie('sessionId');
        } catch (err) {
            console.log("error", err);
        }
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleLoginSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        getLoginInfo(email,password)
    };
    return (
        <S.LoginSection>
            <S.Form onSubmit={handleLoginSubmit}>
                <S.H1>로그인</S.H1>
                <p>신규 사용자이신가요? <a href='#'>계정 만들기</a></p>
                <input
                    onChange={handleEmailChange}
                >
                    <S.Label>이메일</S.Label>
                    <S.InputSection type="id" name="email" placeholder="이메일을 입력하세요"/>
                </input>
                <input
                    onChange={handlePasswordChange}
                >
                    <S.Label>비밀번호</S.Label>
                    <S.InputSection type="password" name="password" placeholder="비밀번호를 입력하세요"/>
                </input>
                <S.Loginbtn className="submit__btn" type="submit">login</S.Loginbtn>
            </S.Form>
        </S.LoginSection>
    )
}


export default Login;