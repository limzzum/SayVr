import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLogged(accessToken !== null);
  });

  const handleLogout = () => {
    // accessToken 삭제
    sessionStorage.removeItem("accessToken");
    // 로그인 상태 업데이트
    setIsLogged(false);
  };

  return (
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
            {isLogged ? (
              <>
                <Link className="nav-link me-4" to="/My">
                  마이페이지
                </Link>
                <Button
                  variant="outline-dark"
                  className="btn-block d-flex justify-content-center"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={handleLogout}
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
  );
};

export default NavBar;
