import "./style.css"
import CNN from "../../../assets/YoutubeCard/CNN.png"

function CNNPage() {
    return(
      <div className="container">
        <div className="BBCpage-container">
          <div className="youtube-profile-container">
            <img src={CNN} className="youtube-profile"/>
          </div>
        </div>
      </div>
    );
}
export default CNNPage