import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getUserData, UserData } from "../../api/MyPageAPI/GetUserData";
import API_URL from "../../config";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ActiveCalendar from "../../api/MyPageAPI/ActivityCalendar";
import MyPageBadge from "../../assets/MygradeAssets/MyPageBadge.png";
import ChangeNicknameModal from "../../components/MyPageComponents/ChangeNicknameModal";
import ChangeProfileModal from "../../components/MyPageComponents/ChangeProfileModal";
import MyWordCard from "../../components/MyWordCard";
import StudyListSection from "../../components/MyPageComponents/StudyCard";
import VocabListPage from "../../components/MyPageComponents/WordCard";
import { tokenState } from "../../recoil/GoalbalState";
import { useRecoilValue } from 'recoil';
import "./style.css";

function MyPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isChangeNicknameModalOpen, setIsChangeNicknameModalOpen] = useState(false);
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] = useState(false);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        console.log("토큰 제대로 전달 되는지",token)
        const data = await getUserData(token);
        console.log("토큰 제대로 전달 되는지",token)
        data.data.profile = `${API_URL}/${data.data.profile}`;
        console.log("받아온 데이터", data);
  
        if (isMounted) {
          setUserData(data);
        }
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [token]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  const handleOpenChangeNicknameModal = () => {
    setIsChangeNicknameModalOpen(true);
  };

  const handleCloseChangeNicknameModal = () => {
    setIsChangeNicknameModalOpen(false);
  };

  const handleOpenChangeProfileModal = () => {
    setIsChangeProfileModalOpen(true);
  };

  const handleCloseChangeProfileModal = () => {
    setIsChangeProfileModalOpen(false);
  };

  const handleNicknameChange = (newNickname: string) => {
    console.log("변경된 닉네임:", newNickname);
  };

  const handleProfileChange = (newProfile: File) => {
    console.log("변경된 프로필:", newProfile);
  };

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="row justify-content-center align-items-center custom-chart-container">
        <div className="col-sm-2 d-flex align-items-center">
          {userData && <img className="userimg" src={userData.data.profile} alt="User" />}
          <div className="ml-2">
            {userData && <p>{userData.data.username}</p>}
            <p>랭킹 31</p>
          </div>
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-start">
          <img className="badgeimg" src={MyPageBadge} alt="User" />
        </div>
        <div className="col-sm-5 d-flex flex-column align-items-end">
          <button className="btn mb-2" onClick={handleOpenChangeProfileModal}>
            프로필 수정
          </button>
          <ChangeProfileModal
            show={isChangeProfileModalOpen}
            onHide={handleCloseChangeProfileModal}
            onProfileChange={handleProfileChange}
          />
          <ChangeNicknameModal
            show={isChangeNicknameModalOpen}
            onHide={handleCloseChangeNicknameModal}
            onNicknameChange={handleNicknameChange}
          />
          <button className="btn" onClick={handleOpenChangeNicknameModal}>
            닉네임 수정
          </button>
        </div>
      </div>
      <div className="row justify-content-center custom-chart-container">
        <h3>내 활동</h3>
        <div>
          <ActiveCalendar />
        </div>
      </div>
      <div className="row card-row custom-chart-container">
        <h3>내 단어장</h3>
        <Slider {...carouselSettings}></Slider>
        <VocabListPage />
      </div>

      <h3>내 스터디</h3>
      <Slider {...carouselSettings} className="row card-row custom-chart-container">
        <StudyListSection />
      </Slider>
    </div>
  );
}

export default MyPage;
