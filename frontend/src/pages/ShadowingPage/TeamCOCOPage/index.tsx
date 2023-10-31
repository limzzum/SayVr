import "./style.css"
import TeamCOCO from "../../../assets/YoutubeCard/TeamCOCO.png"

function TeamCOCOPage() {
    return(
      <div className="container">
        <div className="TeamCOCOPage-container">
          <div className="youtube-profile-container">
            <img src={TeamCOCO} className="youtube-profile"/>
          </div>
        </div>
      </div>
    );
}
export default TeamCOCOPage