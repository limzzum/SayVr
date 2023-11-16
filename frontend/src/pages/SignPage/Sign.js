import React, { useState } from "react";
import "./Sign.css";
import { checkNickname, checkId, signUp } from "../../api/UserPageAPI/SignUser";
import { useNavigate } from "react-router-dom";

function Sign() {
	const navigate = useNavigate();
	const [duplicateEmail, setDuplicateEmail] = useState(false);
	const [duplicateNickname, setDuplicateNickname] = useState(false);

	async function signUpInsert(event) {
		event.preventDefault();
		const form = document.querySelector("#member-form");
		const formData = new FormData(form);

		let isEmpty = false;
		for (const value of formData.values()) {
			if (!value) {
				isEmpty = true;
				break;
			}
		}
		if (isEmpty) {
			alert("입력하지 않은 항목이 있습니다.");
			return;
		}

		if (!duplicateEmail) {
			alert("아이디 중복 체크를 해주세요.");
			return;
		}

		if (!duplicateNickname) {
			alert("닉네임 중복 체크를 해주세요.");
			return;
		}

		try {
			const response = await signUp(formData);

			if (response.data.httpStatus === "CREATED") {
				alert("회원가입을 축하드립니다!");
				navigate("/login");
			} else {
				alert("입력 실패!");
				console.log(response.data);
			}
		} catch (error) {
			alert("입력 중 오류 발생!");
			console.log(error);
		}
	}

	//----------------------------------이메일체크--------------------------------------------
	function checkEmailLength() {
		const email = document.querySelector("#f-email").value;

		if (email.length < 6) {
			document.querySelector(".email_already").style.display = "none";
			document.querySelector(".email_ok").style.display = "none";
			document.querySelector(".email_no").style.display = "inline-block";
		} else {
			document.querySelector(".email_no").style.display = "none";
		}
	}

	async function checkEmailDuplicate() {
		const email = document.querySelector("#f-email").value;

		if (email.length < 6) {
			document.querySelector(".email_already").style.display = "none";
			document.querySelector(".email_ok").style.display = "none";
			document.querySelector(".email_no").style.display = "inline-block";
			return;
		}

		document.querySelector(".email_no").style.display = "none";

		try {
			const response = await checkId(email);
			const cnt = response.data.data;
			if (cnt === true) {
				document.querySelector(".email_ok").style.display = "inline-block";
				document.querySelector(".email_already").style.display = "none";
				setDuplicateEmail(true);
			} else {
				document.querySelector(".email_already").style.display = "inline-block";
				document.querySelector(".email_ok").style.display = "none";
				alert("아이디를 다시 입력해주세요");
				document.getElementById("f-email").value = "";
			}
		} catch (error) {
			console.error(error);
			alert("에러입니다");
		}
	}
	//----------------------------------비밀번호체크--------------------------------------------
	function checkPW() {
		var pw = document.getElementById("f-password").value;

		if (pw.length < 6 || pw.length > 18) {
			alert("6자리 ~ 18자리 이내로 입력해주세요.");
			document.getElementById("f-password").value = "";
			document.querySelector(".password_ok").style.display = "none";
		} else if (pw.search(/\s/) != -1) {
			alert("비밀번호는 공백 없이 입력해주세요.");
			document.getElementById("f-password").value = "";
			document.querySelector(".password_ok").style.display = "none";
		} else {
			document.querySelector(".password_ok").style.display = "inline-block";
			console.log("비밀번호 형식이 맞습니다.");
			return true;
		}
	}

	//----------------------------------비밀번호 재확인--------------------------------------------
	function checkPW2() {
		var p1 = document.getElementById("f-password").value;
		var p2 = document.getElementById("f-password2").value;
		if (p1 && p2) {
			if (p1 != p2) {
				alert("비밀번호가 일치 하지 않습니다. 다시 입력해주세요.");
				document.getElementById("f-password").value = "";
				document.getElementById("f-password2").value = "";
				document.querySelector(".password_ok").style.display = "none";
				document.querySelector(".password_ok2").style.display = "none";
			} else {
				document.querySelector(".password_ok2").style.display = "inline-block";
				return true;
			}
		}
	}

	//----------------------------------닉네임체크--------------------------------------------
	function checknickNameLength() {
		const nickname = document.querySelector("#f-nickname").value;

		if (nickname.length < 2 || nickname.length > 10) {
			document.querySelector(".nickname_ok").style.display = "none";
			document.querySelector(".nickname_already").style.display = "none";
			document.querySelector(".nickname_size").style.display = "inline-block";
		} else {
			document.querySelector(".nickname_size").style.display = "none";
		}
	}

	async function checkNicknameDuplicate() {
		const nickname = document.querySelector("#f-nickname").value;
		if (nickname.length < 2 || nickname.length > 10) {
			document.querySelector(".nickname_ok").style.display = "none";
			document.querySelector(".nickname_already").style.display = "none";
			document.querySelector(".nickname_size").style.display = "inline-block";
			return;
		}
		try {
			const response = await checkNickname(nickname);
			const cnt = response.data.data;
			if (cnt === true) {
				document.querySelector(".nickname_ok").style.display = "inline-block";
				document.querySelector(".nickname_already").style.display = "none";
				setDuplicateNickname(true);
			} else {
				document.querySelector(".nickname_already").style.display = "inline-block";
				document.querySelector(".nickname_ok").style.display = "none";
				alert("닉네임을 다시 입력해주세요");
				document.getElementById("f-nickname").value = "";
			}
		} catch (error) {
			console.error(error);
			alert("에러입니다");
		}
	}

	return (
		<div className="signB">
			<div className="member-body">
				{/* 
        <div className="member-form-img">
          <img src="../img/logo2.png"></img>
        </div> 
        */}
				<form id="member-form" className="member-form">
					<h3>회원가입</h3>
					<table className="member-form-table">
						<tbody>
							<tr>
								<th className="email-th">아이디</th>
								<td>
									<div>
										<input
											id="f-email"
											type="id"
											name="email"
											className="email"
											placeholder="아이디를 6글자 이상 입력해주세요."
											onInput={checkEmailLength}
										/>
										<button
											type="button"
											className="btn btn-primary"
											id="btn-checkEmail"
											onClick={checkEmailDuplicate}
										>
											아이디 중복 체크
										</button>
									</div>
									<span className="email_ok">사용 가능한 아이디입니다.</span>
									<span className="email_already">
										누군가 이 아이디를 사용하고 있어요.
									</span>
									<span className="email_no">
										아이디는 6글자 이상 입력해야합니다.
									</span>
								</td>
							</tr>
							<tr>
								<th className="password-th">비밀번호</th>
								<td>
									<input
										id="f-password"
										type="password"
										name="password"
										className="password"
										placeholder="특수문자, 영문, 숫자 포함 6~18자리"
										onBlur={checkPW}
									/>
									<span className="password_ok">사용 가능한 비밀번호입니다.</span>
								</td>
							</tr>
							<tr>
								<th className="password-th">비밀번호 확인</th>
								<td>
									<input
										id="f-password2"
										type="password"
										className="password"
										placeholder="패스워드 재확인"
										onBlur={checkPW2}
									/>
									<span className="password_ok2">패스워드가 일치합니다.</span>
								</td>
							</tr>
							<tr>
								<th className="nickname-th">닉네임</th>
								<td>
									<input
										id="f-nickname"
										type="nickname"
										name="nickname"
										className="nickname"
										placeholder="닉네임을 입력해주세요."
										onInput={checknickNameLength}
									/>
									<button
										type="button"
										className="btn btn-primary"
										id="btn-checkNickname"
										onClick={checkNicknameDuplicate}
									>
										닉네임 중복 체크
									</button>
									<span className="nickname_ok">사용 가능한 닉네임입니다.</span>
									<span className="nickname_already">
										누군가 이 닉네임을 사용하고 있어요.
									</span>
									<span className="nickname_size">
										닉네임을 2-10글자 사이로 입력해주세요.
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div>
						<button
							type="submit"
							className="btn btn-primary"
							id="btn-insert"
							onClick={signUpInsert}
						>
							가입하기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Sign;
