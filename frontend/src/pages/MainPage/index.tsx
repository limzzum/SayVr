import MainPageImg from "../../assets/MainPageAssets/MainPageImage.jpg"

function MainPage() {

    return (
      <div>
        <img src={MainPageImg} alt="VrImg" style={{ width: '100vw', height: '75vh', objectFit: 'cover' }}/>
        <h1>메인 페이지</h1>
      </div>
    );
  }
  
  export default MainPage;