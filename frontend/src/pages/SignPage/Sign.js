import React, { useState } from "react";
import Swal from "sweetalert2";
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
      Swal.fire({
        title: "입력하지 않은 항목이 있습니다.",
        text: "항목을 다 입력해주세요",
        icon: "warning",
        confirmButtonColor: "#3396f4",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-sign",
        },
      });
      return;
    }

    if (!duplicateEmail) {
      Swal.fire({
        title: "아이디 중복 체크를 해주세요.",
        icon: "warning",
        confirmButtonColor: "#3396f4",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-sign",
        },
      });
      return;
    }

    if (!duplicateNickname) {
      Swal.fire({
        title: "닉네임 중복 체크를 해주세요.",
        icon: "warning",
        confirmButtonColor: "#3396f4",
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "swal-btn-sign",
        },
      });
      return;
    }

    try {
      const response = await signUp(formData);

      if (response.data.httpStatus === "CREATED") {
        navigate("/login");
        Swal.fire({
          icon: "success",
          title: "회원가입에 성공했습니다",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
      }
    } catch (error) {
      if (e.response && e.response.data) {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
      }
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
      }
    } catch (error) {
      if (error.response.data.errorCode === "USER_002") {
        document.querySelector(".email_already").style.display = "inline-block";
        document.querySelector(".email_ok").style.display = "none";
        if (e.response && e.response.data) {
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            customClass: {
              confirmButton: "swal-btn-sign",
              icon: "swal-icon-sign",
            },
          });
        }
        document.getElementById("f-email").value = "";
      }
    }
  }
  //----------------------------------비밀번호체크--------------------------------------------
  function checkPW() {
    var pw = document.getElementById("f-password").value;

    if (pw.length < 6 || pw.length > 18) {
      Swal.fire({
        icon: "warning",
        title: "6자리 ~ 18자리 이내로 입력해주세요.",
        customClass: {
          confirmButton: "swal-btn-sign",
          icon: "swal-icon-sign",
        },
      });
      document.getElementById("f-password").value = "";
      document.querySelector(".password_ok").style.display = "none";
    } else if (pw.search(/\s/) != -1) {
      Swal.fire({
        icon: "warning",
        title: "비밀번호는 공백 없이 입력해주세요.",
        customClass: {
          confirmButton: "swal-btn-sign",
          icon: "swal-icon-sign",
        },
      });
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
        Swal.fire({
          icon: "warning",
          title: "비밀번호가 일치 하지 않습니다. 다시 입력해주세요.",
          customClass: {
            confirmButton: "swal-btn-sign",
            icon: "swal-icon-sign",
          },
        });
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
      }
    } catch (error) {
      if (error.response.data.errorCode === "USER_001") {
        document.querySelector(".nickname_already").style.display =
          "inline-block";
        document.querySelector(".nickname_ok").style.display = "none";
        Swal.fire({
          title: "닉네임를 다시 입력해주세요.",
          icon: "warning",
          confirmButtonColor: "#3396f4",
          confirmButtonText: "확인",
          customClass: {
            confirmButton: "swal-btn-sign",
          },
        });
        document.getElementById("f-nickname").value = "";
      }
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
                  <span className="password_ok">
                    사용 가능한 비밀번호입니다.
                  </span>
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
