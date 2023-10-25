import img from "../../assets/MainPageAssets/MainPageImage.jpg";
import MyPageBadge from "../../assets/MygradeAssets/MyPageBadge.png";
import MyStudyCard from "../../components/MyStudyCard";
import MyWordCard from "../../components/MyWordCard";
import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyPage() {
  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    fontSize: "24px",
    color: "black", // 검정색으로 변경
    cursor: "pointer",
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여질 카드 수
    slidesToScroll: 1, // 넘어갈 카드 수
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="row justify-content-center align-items-center custom-chart-container">
        <div className="col-sm-2 d-flex align-items-center">
          <img className="userimg" src={img} alt="User" />
          <div className="ml-2">
            <p>김싸피</p>
            <p>랭킹 31</p>
          </div>
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-start">
          <img className="badgeimg" src={MyPageBadge} alt="User" />
        </div>
        <div className="col-sm-5 d-flex flex-column align-items-end">
          <button className="btn mb-2">프로필 수정</button>
          <button className="btn">닉네임 수정</button>
        </div>
      </div>
      <div className="row justify-content-center custom-chart-container">
        <h3>내 활동</h3>
        <div>
          <p>잔디</p>
        </div>
      </div>
      <div className="row card-row custom-chart-container">
        <h3>내 단어장</h3>
        <Slider {...carouselSettings}>
          <MyWordCard />
          <MyWordCard />
          <MyWordCard />
          <MyWordCard />
          <MyWordCard />
          <MyWordCard />
          <MyWordCard />
        </Slider>
      </div>
      <div className="row card-row custom-chart-container">
        <h3>내 스터디</h3>
        <Slider {...carouselSettings}>
          <MyStudyCard />
          <MyStudyCard />
          <MyStudyCard />
          {/* 추가적인 카드들 */}
        </Slider>
      </div>
    </div>
  );
}

export default MyPage;
