import MainPageImg from "../../assets/MainPageAssets/MainPageImage.jpg"
import "./style.css"

function MainPage() {

    return (
      <div>
        <img src={MainPageImg} alt="VrImg" style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}/>
        <p className="englishword">"Take your time, please"</p>\
        <p className="koreanword">천천히 준비하세요</p>
      </div>
    );
  }
  
  export default MainPage;