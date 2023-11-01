import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage"
import MatchingGamePage from "./pages/MatchingGamePage";
import MyPage from "./pages/MyPage";
import MyStudyAnalysisPage from "./pages/MyStudyAnalysisPage";
import ShadowingPage from "./pages/ShadowingPage";
import StudyPage from "./pages/StudyPage";
import VocabListPage from "./pages/VocabListPage";
import BBCPage from "./pages/ShadowingPage/BBCPage"
import CNNPage from "./pages/ShadowingPage/CNNPage";
import TeamCOCOPage from "./pages/ShadowingPage/TeamCOCOPage";
import TEDPage from "./pages/ShadowingPage/TEDPage"; 
import ShadowingDtailPage from "./pages/ShadowingPage/ShadowingDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/MatchingGame" element={<MatchingGamePage />} />
      <Route path="/My" element={<MyPage />} />
      <Route path="/MyStudyAnalysis" element={<MyStudyAnalysisPage />} />
      <Route path="/Shadowing" element={<ShadowingPage />} />
      <Route path="/Shadowing/BBCPage" element={<BBCPage />} />
      <Route path="/Shadowing/CNNPage" element={<CNNPage />} />
      <Route path="/Shadowing/TeamCOCOPage" element={<TeamCOCOPage />} />
      <Route path="/Shadowing/TEDPage" element={<TEDPage />} />
      <Route path="/Shadowing/ShadowingDetailPage" element={<ShadowingDtailPage />} />
      <Route path="/Study" element={<StudyPage />} />
      <Route path="/VocabList" element={<VocabListPage />} />
    </Routes>
  );
}

export default App;
