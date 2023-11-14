import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot, useRecoilState } from "recoil";
import { tokenState } from "../recoil/GoalbalState";
import { logout } from "../api/UserPageAPI/UserAPI";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const navigate = useNavigate();

  const logoutToken = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem("userId");
    setToken('');
    navigate("/");
};

  return (
    <RecoilRoot>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          말해Vr
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link me-4" to="/VocabList">
              단어장
            </Link>
            <Link className="nav-link me-4" to="/StudyList">
              스터디
            </Link>
            <Link className="nav-link me-4" to="/MyStudyAnalysis">
              내 학습 기록&통계
            </Link>
            <Link className="nav-link me-4" to="/Shadowing">
              쉐도잉
            </Link>
            <Link className="nav-link me-4" to="/MatchingGame">
              매칭게임
            </Link>
            {token ? (
              <>
                <Link className="nav-link me-4" to="/My">
                  마이페이지
                </Link>
                <Button
                  variant="outline-dark"
                  className="btn-block d-flex justify-content-center"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={logoutToken}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <Link className="nav-link" to="/Login">
                로그인
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </RecoilRoot>
  );
};

export default NavBar;
