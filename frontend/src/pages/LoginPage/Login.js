import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/UserPageAPI/SignUser";
import { useRecoilState } from "recoil";
import { loggedIdState, tokenState } from "../../recoil/GoalbalState";

function Login() {
	const navigate = useNavigate();
	const [token, setToken] = useRecoilState(tokenState);
	const [loggedId, setLoggedId] = useRecoilState(loggedIdState);

	async function userLogin() {
		const form = document.querySelector("#login-form");
		const formData = new FormData(form);

		try {
			const response = await login(formData);
			// if(localStorage.getItem("accessToken")) {
			//   localStorage.removeItem('accessToken');
			// }
			// if(localStorage.getItem("userId")) {
			//   localStorage.removeItem('userId');
			// }

			if (response.data.httpStatus === "OK") {
				console.log(response.data);
				localStorage.setItem(
					"accessToken",
					response.data.data.tokenResponseDto.accessToken
				);
				localStorage.setItem("userId", response.data.data.userId);
				setToken(localStorage.getItem("accessToken"));
				setLoggedId(response.data.data.userId);
				alert("로그인 성공");
				navigate("/");
			} else {
				alert("로그인 실패!");
			}
		} catch (error) {
			alert("로그인 오류!");
			console.log(error);
		}
	}

	const userSign = function () {
		navigate("/Sign");
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault(); // 이벤트의 기본 동작을 막음
			userLogin();
		}
	};

	return (
		<div className="loginB">
			<div className="login-body">
				{/* 
        <div className="login-form-img">
          <img></img>
        </div> 
        */}
				<form id="login-form" action="login" method="post" className="login-form">
					<h2>로그인</h2>
					<table>
						<tr>
							<th className="email-th">아이디</th>
							<td>
								<input type="id" className="email" name="email"></input>
							</td>
						</tr>
						<tr>
							<th className="password-th">비밀번호</th>
							<td>
								<input
									type="password"
									className="password"
									name="password"
									onKeyDown={handleKeyDown}
								></input>
							</td>
						</tr>
					</table>

					<div>
						{/* <input type='checkbox' className='checkbox'>ID 저장</input> */}
						<button
							id="btn-login"
							type="button"
							className="btn-login"
							onClick={userLogin}
						>
							로그인
						</button>
						<button
							id="btn-signUpMove"
							type="button"
							className="btn-login"
							onClick={userSign}
						>
							회원가입
						</button>
					</div>

					{/* 
          <div className="under-line">
						<p className="line1"></p>
						<p className="line2">Or</p>
						<p className="line3"></p>
					</div>
					<div className="login-other"><SocialKakao /></div> 
          */}
				</form>
			</div>
		</div>
	);
}

export default Login;
