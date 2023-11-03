import React from "react";
import "./Login.css";
import axios from "axios";
import FacebookLogin from "@greatsumini/react-facebook-login";
// axios.defaults.withCredentials = true;

function Login() {

  function facebookLogin(accessToken) {
    const data = {
      accessToken: accessToken,
    };

    axios
      .post("https://말해vr:site/api/user/facebookLogin", data)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          window.location.href = "/";
          alert("페이스북 로그인 성공!");
        } else {
          alert("페이스북 로그인 실패!");
        }
      })
      .catch((exception) => {
        alert("페이스북 로그인 오류!");
        console.log(exception);
      });
  }

  return (
    <div className="loginB">
      <div className="login-body">
          <div className="login-other">
            <FacebookLogin
              appId="1463287787865536"
              initParams={{
                cookie: true,
                xfbml: true,
                version: "v16.0",
              }}
              scope="email, public_profile"
              style={{
                backgroundColor: "#4267b2",
                color: "#fff",
                fontSize: "16px",
                padding: "12px 24px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onSuccess={(response) => {
                console.log("Login Success!");
                console.log(response);
                facebookLogin(response.accessToken);
              }}
              onFail={(error) => {
                console.log("Login Failed!");
                console.log("status: ", error.status);
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!");
                console.log("name: ", response);
                console.log(response);
              }}
            />
          </div>
      </div>
    </div>
  );
}

export default Login;
