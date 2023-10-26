import "./style.css";
import BBC from "../../assets/YoutubeCard/BBC.png";
import CNN from "../../assets/YoutubeCard/CNN.png";
import TeamCOCO from "../../assets/YoutubeCard/TeamCOCO.png";
import Ted from "../../assets/YoutubeCard/Ted.png";

function ShadowingPage() {
  return (
    <div className="shadowingpage-container">
      <div className="row m-5">
        <h2 style={{ fontWeight: 'bold' }}>youtube VOD</h2>
      </div>
      <div className="row justify-content-center align-items-center mt-3">
        <button className="youtubecard col-2" style={{ border: "none" }}>
          <img src={BBC} alt="BBC Logo" style={{ width: "110%", height: "100%" }} />
        </button>
        <button className="youtubecard col-2" style={{ border: "none" }}>
          <img src={CNN} alt="CNN Logo" style={{ width: "110%", height: "100%" }} />
        </button>
        <button className="youtubecard col-2" style={{ border: "none" }}>
          <img src={TeamCOCO} alt="TeamCOCO Logo" style={{ width: "110%", height: "100%" }} />
        </button>
        <button className="youtubecard col-2" style={{ border: "none" }}>
          <img src={Ted} alt="Ted Logo" style={{ width: "110%", height: "100%" }} />
        </button>
      </div>
    </div>
  );
}

export default ShadowingPage;
