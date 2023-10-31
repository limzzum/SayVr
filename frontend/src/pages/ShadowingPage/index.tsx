import "./style.css";
import BBC from "../../assets/YoutubeCard/BBC.png";
import CNN from "../../assets/YoutubeCard/CNN.png";
import TeamCOCO from "../../assets/YoutubeCard/TeamCOCO.png";
import TED from "../../assets/YoutubeCard/TED.png";
import { Link } from "react-router-dom";

function ShadowingPage() {
  return (
    <div className="container">
      <div className="shadowingpage-container">
        <div className="row m-5">
          <h2 style={{ fontWeight: "bold" }}>youtube VOD</h2>
        </div>
        <div className="row justify-content-center align-items-center mt-3">
          <Link to="/Shadowing/BBCPage" className="youtubecard col-2">
            <button style={{ border: "none", background: "none" }}>
              <img src={BBC} alt="BBC Logo" style={{ width: "100%", height: "100%" }} />
            </button>
          </Link>
          <Link to="/Shadowing/CNNPage" className="youtubecard col-2">
            <button style={{ border: "none", background: "none" }}>
              <img src={CNN} alt="CNN Logo" style={{ width: "100%", height: "100%" }} />
            </button>
          </Link>
          <Link to="/Shadowing/TeamCOCOPage" className="youtubecard col-2">
            <button style={{ border: "none", background: "none" }}>
              <img src={TeamCOCO} alt="TeamCOCO Logo" style={{ width: "100%", height: "100%" }} />
            </button>
          </Link>
          <Link to="/Shadowing/TEDPage" className="youtubecard col-2">
            <button style={{ border: "none", background: "none" }}>
              <img src={TED} alt="TED Logo" style={{ width: "100%", height: "100%" }} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShadowingPage;
