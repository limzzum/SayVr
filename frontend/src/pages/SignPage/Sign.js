import React from "react";
import "./Sign.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

//----------------------------------회원가입--------------------------------------------
function Sign() {
  const navigate = useNavigate();

  const signUp = function () {
    const form = document.querySelector("#member-form");
    const formData = new FormData(form);

    // 폼 데이터의 각 필드가 비어있는지 확인
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

    let json = JSON.stringify(Object.fromEntries(formData));
    // console.log(json);
    fetch("http://localhost/web/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    })
      .then((response) => {
        console.log(json);
        return response.json();
      })
      .then((result) => {
        if (result.status == "success") {
          alert("회원가입을 축하드립니다!");
        } else {
          alert("입력 실패!");
          console.log(result.data);
        }
      })
      .catch((exception) => {
        alert("입력 중 오류 발생!");
        console.log(exception);
      });

    navigate("/Main");
  };

  //----------------------------------이메일체크--------------------------------------------
  function checkEmail() {
    const email = document.querySelector("#f-email").value; //id값이 "f-email"인 입력란의 값을 저장
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{3,}$/; // 이메일 형식 검사를 위한 정규식

    if (!emailRegex.test(email)) {
      // 이메일 형식이 유효하지 않은 경우
      document.querySelector(".email_already").style.display = "none";
      document.querySelector(".email_ok").style.display = "none";
      document.querySelector(".email_no").style.display = "inline-block";
      return;
    } else {
      fetch("http://localhost/web/members/emailCheck?email=" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((cnt) => {
          if (cnt == 0) {
            //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
            document.querySelector(".email_ok").style.display = "inline-block";
            document.querySelector(".email_already").style.display = "none";
            document.querySelector(".email_no").style.display = "none";
          } else {
            // cnt가 1일 경우 -> 이미 존재하는 아이디
            document.querySelector(".email_already").style.display =
              "inline-block";
            document.querySelector(".email_ok").style.display = "none";
            document.querySelector(".email_no").style.display = "none";
            alert("아이디를 다시 입력해주세요");
            document.getElementById("f-email").value = "";
          }
        })
        .catch((error) => {
          console.error(error);
          alert("에러입니다");
        });
    }
  }

  //----------------------------------비밀번호체크--------------------------------------------
  function checkPW() {
    var pw = document.getElementsByName("password")[0].value;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/gi);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 6 || pw.length > 18) {
      alert("6자리 ~ 18자리 이내로 입력해주세요.");
      document.getElementById("f-password").value = "";
      return false;
    } else if (pw.search(/\s/) != -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      document.getElementById("f-password").value = "";
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      document.getElementById("f-password").value = "";
      return false;
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
  function checkNickname() {
    const nickname = document.querySelector("#f-nickname").value;

    fetch("http://localhost/web/members/nickCheck?nickname=" + nickname, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((cnt) => {
        if (cnt == 0) {
          document.querySelector(".nickname_ok").style.display = "inline-block";
          document.querySelector(".nickname_already").style.display = "none";
        } else {
          document.querySelector(".nickname_already").style.display =
            "inline-block";
          document.querySelector(".nickname_ok").style.display = "none";
          alert("닉네임을 다시 입력해주세요");
          document.getElementById("f-nickname").value = "";
        }
      })
      .catch((error) => {
        console.error(error);
        alert("에러입니다");
      });
  }

  // ---------------------------------휴대폰번호 하이픈 삽입-----------------------------------
  const [tel, setTel] = useState("");

  const hypenTel = (value) => {
    const processedValue = value.replace(/[^0-9]/g, "");
    const telLength = processedValue.length;

    if (telLength < 4) {
      return processedValue;
    } else if (telLength < 7) {
      return `${processedValue.slice(0, 3)}-${processedValue.slice(3)}`;
    } else if (telLength < 11) {
      return `${processedValue.slice(0, 3)}-${processedValue.slice(
        3,
        6
      )}-${processedValue.slice(6)}`;
    } else {
      return `${processedValue.slice(0, 3)}-${processedValue.slice(
        3,
        7
      )}-${processedValue.slice(7, 11)}`;
    }
  };

  const handleTelChange = (event) => {
    const value = event.target.value;
    const processedValue = hypenTel(value);
    setTel(processedValue);
  };

  return (
    <div className="signB">
      <div className="member-body">
        <div className="member-form-img">
          <img src="../img/logo2.png"></img>
        </div>
        <form id="member-form" className="member-form">
          <h3>회원가입</h3>
          <table className="member-form-table">
            <tbody>
              <tr>
                <th className="email-th">Email</th>
                <td>
                  <input
                    id="f-email"
                    type="email"
                    name="email"
                    className="email"
                    placeholder="email 형식으로 입력해주세요."
                    onInput={checkEmail}
                  />
                  <span className="email_ok">사용 가능한 아이디입니다.</span>
                  <span className="email_already">
                    누군가 이 아이디를 사용하고 있어요.
                  </span>
                  <span className="email_no">
                    올바른 이메일 형식이 아닙니다.
                  </span>
                </td>
              </tr>
              <tr>
                <th className="password-th">Password</th>
                <td>
                  <input
                    id="f-password"
                    type="password"
                    name="password"
                    className="password"
                    placeholder="특수문자, 영문, 숫자 포함 6~18자리"
                    onBlur={checkPW}
                  />
                  <span className="password_ok">
                    사용 가능한 비밀번호입니다.
                  </span>
                </td>
              </tr>
              <tr>
                <th className="password-th">Confirm Password</th>
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
                <th className="name-th">Name</th>
                <td>
                  <input
                    type="name"
                    name="name"
                    className="name"
                    placeholder="이름을 알려주세요."
                  />
                </td>
              </tr>
              <tr>
                <th className="nickname-th">NickName</th>
                <td>
                  <input
                    id="f-nickname"
                    type="nickname"
                    name="nickname"
                    className="nickname"
                    placeholder="닉네임을 입력해주세요."
                    onBlur={checkNickname}
                  />
                  <span className="nickname_ok">사용 가능한 닉네임입니다.</span>
                  <span className="nickname_already">
                    누군가 이 닉네임을 사용하고 있어요.
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
              onClick={signUp}
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
