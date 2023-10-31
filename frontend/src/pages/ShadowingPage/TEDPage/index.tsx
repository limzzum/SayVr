import "./style.css"
import TED from "../../../assets/YoutubeCard/TED.png"

function TEDPage() {
    return(
      <div className="container">
        <div className="TEDPage-container">
          <div className="youtube-profile-container">
            <img src={TED} className="youtube-profile"/>
          </div>
        </div>
      </div>
    );
}
export default TEDPage