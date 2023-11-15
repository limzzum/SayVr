import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import IconButton from "../../../components/StudyComponents/IconButton";
import SettingsIcon from "../../../components/StudyComponents/SettingsIcon";
import WeeklySprintComponent from "../../../components/StudyComponents/WeeklySprintComponent";
import MyStudyWordCard from "../../../components/StudyComponents/MyStudyWordCard";
import {
  StudyDetailResponseDto,
  GoalDetailResponseDto,
  StudyDeckDetailResponseDto,
  getOneStudy,
  getStudyDeckList,
  StudyDeckInfo,
} from "../../../api/StudyPageAPI/StudyAPI";
import AddButton from "../../../components/StudyComponents/AddButton";
import ReadStudyInfoModalAndOut from "../../../components/StudyComponents/ReadStudyInfoModalAndOut";
import UpdateNewStudyModal from "../../../components/StudyComponents/UpdateNewStudyModal";
import CreatWeeklySprintModal from "../../../components/StudyComponents/CreatWeeklySprintModal";
import "../style.css";
import { Button } from "react-bootstrap";
import CreateStudyWordModal from "../../../components/StudyComponents/CreateStudyWordModal";

interface ArrowProps {
  onClick: () => void;
}
const carouselSettings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
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

const StudyDetail: React.FC = () => {
  const { id } = useParams();
  const [studyId, setStudyId] = useState(Number(id));
  const [studyDetailInfo, setStudyDetailInfo] =
    useState<StudyDetailResponseDto>();
  const [preWeeklySprintId, setPreWeeklySprintId] = useState<number>(0);
  const [nextWeeklySprintId, setNextWeeklySprintId] = useState<number>(0);
  const [goalInfo, setGoalInfo] = useState<GoalDetailResponseDto>();
  const [studyDeckList, setStudyDeckList] =
    useState<StudyDeckDetailResponseDto>();
  const [showReadModal, setShowReadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);
  const [showCreateWordModal, setCreateWordModal] = useState(false);
  const [studyCardTitles, setStudyCardTitles] = useState<StudyDeckInfo[]>([]);
  const sliderPersonal = useRef<Slider | null>(null);

  // const searchParams: ReadDeckSearchRequestDto = {
  //   lastId: 1000,
  //   pageSize: 9,
  //   sortBy: orderby,
  //   keyword: keyword,
  // };

  const handleReadPlusButtonClick = () => {
    setShowReadModal(true);
  };

  const handleUpdatePlusButtonClick = () => {
    setShowUpdateModal(true);
  };

  const handleUpdateCloseButtonClick = () => {
    setShowUpdateModal(false);
  };

  const handleReadCloseModal = () => {
    setShowReadModal(false);
  };

  const handleCreatePlusButtonClick = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (goalInfo?.targetDate) {
      const targetDate = new Date(goalInfo.targetDate);
      targetDate.setDate(targetDate.getDate() + 6);

      if (today < targetDate) {
        alert("목표 기간 동안은 새로운 목표를 설정할 수 없습니다.");
        return;
      }
    }
    setCreateModal(true);
  };

  const handleCreateCloseModal = () => {
    setCreateModal(false);
  };

  const handleCreateWordListButtonClick = () => {
    setCreateWordModal(true);
  };

  const handleCreateWordListCloseModal = () => {
    setCreateWordModal(false);
  };

  const navigate = useNavigate();
  const goToDetail = async (id: number) => {
    navigate(`/studycard/${id}`);
  };

  const ArrowLeft = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowLeft />
        </Button>
      </>
    );
  };
  const ArrowRight = (props: ArrowProps) => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={props.onClick}
        >
          <BsArrowRight />
        </Button>
      </>
    );
  };

  useEffect(() => {
    getStudyDeckList(studyId)
      .then((res) => {
        let show: StudyDeckInfo[] = res.data.data.studyDeckInfoList;
        setStudyCardTitles(show);
        console.log(show);
      })
      .catch((error) => {
        console.error("Error fetching studyDeckList", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      getOneStudy(studyId)
        .then((res) => {
          if (res.data.httpStatus === "OK") {
            let data = res.data.data;
            console.log(data);
            setStudyDetailInfo(data.studyDetailResponseDto);
            setPreWeeklySprintId(
              data.weeklySprintDetailResponse.preWeeklySprintId
            );
            setNextWeeklySprintId(
              data.weeklySprintDetailResponse.nextWeeklySprintId
            );
            setGoalInfo(data.weeklySprintDetailResponse.goalDetailResponseDto);
            setStudyDeckList(data.studyDeckDetailResponseDto);
          }
        })
        .catch((e) => console.log(e));
      // TODO : 회원 아닌 사람 예외처리하기 스터디 리스트 페이지로 돌려보내기
    }
  }, [id]);

  return (
    <div className="container">
      <div className="studypage-container" style={{ width: "70vw" }}>
        <div className="row study-title">
          <div
            className="col study-name"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <h1>{studyDetailInfo?.studyInfoDto.name}</h1>
            <div style={{ marginLeft: "2rem" }}>
              <Button
                onClick={handleReadPlusButtonClick}
                style={{ width: "126px" }}
                variant="outline-primary"
              >
                스터디 정보
              </Button>
            </div>
          </div>
          <div
            className="col-2 user-name"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <p>{studyDetailInfo?.nickName}</p>

            {studyDetailInfo?.studyRole === "LEADER" ? (
              <>
                <div className="" style={{ marginLeft: "1rem" }}>
                  <IconButton
                    onHover
                    icon={<SettingsIcon />}
                    size={55}
                    handleButtonClick={handleUpdatePlusButtonClick}
                  ></IconButton>
                </div>
              </>
            ) : (
              <>{/* <div /> */}</>
            )}
          </div>
        </div>
        <div className="row">
          <h4>🔔{studyDetailInfo?.studyInfoDto.rule}</h4>
          <hr></hr>
        </div>
        {/* <div className="row justify-content-center align-items-center"> */}
        <div className="study-goal-title">
          <h2>스터디 목표</h2>
          <div style={{ marginLeft: "1rem" }}>
            <AddButton
              handleButtonClick={handleCreatePlusButtonClick}
              size="45"
            />
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div
            className="studypage-inner-container goal-inner"
            style={{ height: "50vh" }}
          >
            <WeeklySprintComponent
              studyId={studyId}
              goalInfo={goalInfo}
              setPreWeeklySprintId={setPreWeeklySprintId}
              setNextWeeklySprintId={setNextWeeklySprintId}
              preWeeklySprintId={preWeeklySprintId}
              nextWeeklySprintId={nextWeeklySprintId}
              setGoalInfo={setGoalInfo}
              memberId={studyDetailInfo?.memberId}
              studyRole={studyDetailInfo?.studyRole}
            ></WeeklySprintComponent>
          </div>
        </div>
        <div className="study-goal-title">
          <h2>스터디 단어장</h2>
          <div style={{ marginLeft: "1rem" }}>
            <AddButton
              handleButtonClick={handleCreateWordListButtonClick}
              size="45"
            />
          </div>
        </div>
        <div className="row card-row justify-content-center align-items-center">
          <div className="studypage-inner-container">
            <div>
              <ArrowLeft onClick={() => sliderPersonal?.current?.slickPrev()} />
              <ArrowRight
                onClick={() => sliderPersonal?.current?.slickNext()}
              />
            </div>
            <div className="row">
              {(studyCardTitles == null || studyCardTitles.length === 0) && (
                <>
                  <MyStudyWordCard addNew={handleCreateWordListButtonClick} />
                </>
              )}
              <Slider
                infinite={studyCardTitles.length >= 3}
                ref={sliderPersonal}
                {...carouselSettings}
              >
                {studyCardTitles?.map((deck, index) => {
                  return (
                    <>
                      <MyStudyWordCard
                        key={index + deck.studyDeckId}
                        addNew={handleCreateWordListButtonClick}
                        props={deck}
                      />
                    </>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="create-new-list-modal">
        <ReadStudyInfoModalAndOut
          showModal={showReadModal}
          handleClose={handleReadCloseModal}
          // goToDetail={goToDetail}
          readStudyInfo={studyDetailInfo}
        />
      </div>
      <div className="create-new-list-modal">
        <UpdateNewStudyModal
          showModal={showUpdateModal}
          handleClose={handleUpdateCloseButtonClick}
          // goToDetail={goToDetail}
          readStudyInfo={studyDetailInfo}
          setStudyDetailInfo={setStudyDetailInfo}
        />
      </div>
      <div className="create-new-list-modal">
        <CreatWeeklySprintModal
          showModal={showCreateModal}
          handleClose={handleCreateCloseModal}
          studyId={studyId}
          setPreWeeklySprintId={setPreWeeklySprintId}
          setNextWeeklySprintId={setNextWeeklySprintId}
          setGoalInfo={setGoalInfo}
        />
      </div>
      <div className="create-new-list-modal">
        <CreateStudyWordModal
          showModal={showCreateWordModal}
          handleClose={handleCreateWordListCloseModal}
          studyId={studyId}
          goToDetail={goToDetail}
        />
      </div>
    </div>
  );
};

export default StudyDetail;
