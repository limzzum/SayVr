import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { MatchingGamePage, MatchingGameStart } from "./pages/MatchingGamePage";
import MyPage from "./pages/MyPage";
import MyStudyAnalysisPage from "./pages/MyStudyAnalysisPage";
import ShadowingPage from "./pages/ShadowingPage";
import BBCPage from "./pages/ShadowingPage/BBCPage";
import CNNPage from "./pages/ShadowingPage/CNNPage";
import ShadowingDtailPage from "./pages/ShadowingPage/ShadowingDetailPage";
import TEDPage from "./pages/ShadowingPage/TEDPage";
import TeamCOCOPage from "./pages/ShadowingPage/TeamCOCOPage";
import StudyPage from "./pages/StudyPage";
import VocabListPage from "./pages/VocabListPage";
import DeckDetail from "./pages/VocabListPage/DeckDetailPage";
import MyStudyAnalysisDetailPage from "./pages/MyStudyAnalysisPage/MyStudyAnalysisDetailPage"
import StudyDetail from "./pages/StudyPage/StudyDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/MatchingGame" element={<MatchingGamePage />} />
      <Route path="/MatchingGame/game" element={<MatchingGameStart />} />
      <Route path="/My" element={<MyPage />} />
      <Route path="/MyStudyAnalysis" element={<MyStudyAnalysisPage />} />
      <Route path="/MyStudyAnalysis/Detail" element={<MyStudyAnalysisDetailPage />} />
      <Route path="/Shadowing" element={<ShadowingPage />} />
      <Route path="/Shadowing/BBCPage" element={<BBCPage />} />
      <Route path="/Shadowing/CNNPage" element={<CNNPage />} />
      <Route path="/Shadowing/TeamCOCOPage" element={<TeamCOCOPage />} />
      <Route path="/Shadowing/TEDPage" element={<TEDPage />} />
      <Route
        path="/Shadowing/ShadowingDetailPage"
        element={<ShadowingDtailPage />}
      />
      <Route path="/StudyList" element={<StudyPage />} />
      <Route path="/study/:id" element={<StudyDetail />} />
      <Route path="/VocabList" element={<VocabListPage />} />
      <Route path="/flashcard/:id" element={<DeckDetail />} />
      
    </Routes>
  );
  
}

export default App;
