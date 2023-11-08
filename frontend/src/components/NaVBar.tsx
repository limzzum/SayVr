import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">말해Vr</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link me-4" to="/VocabList">단어장</Link>
            <Link className="nav-link me-4" to="/StudyList">스터디</Link>
            <Link className="nav-link me-4" to="/MyStudyAnalysis">내 학습 기록&통계</Link>
            <Link className="nav-link me-4" to="/Shadowing">쉐도잉</Link>
            <Link className="nav-link me-4" to="/MatchingGame">매칭게임</Link>
            <Link className="nav-link me-4" to="/My">마이페이지</Link>
            <Link className="nav-link" to="/Login">로그인</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
