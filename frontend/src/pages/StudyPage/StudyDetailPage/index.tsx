import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlusBtn from "../../../assets/Etc/PlusBtn.png";
import IconButton from "../../../components/StudyComponents/IconButton";
import SettingsIcon from "../../../components/StudyComponents/SettingsIcon";
import WeeklySprintComponent from "../../../components/StudyComponents/WeeklySprintComponent";
import MyWordCard from "../../../components/MyWordCard";
import {
  StudyDetailResponseDto,
  GoalDetailResponseDto,
  StudyDeckDetailResponseDto,
  getOneStudy,
} from "../../../api/StudyPageAPI/StudyAPI";
import AddButton from "../../../components/StudyComponents/AddButton";
import ReadStudyInfoModalAndOut from "../../../components/StudyComponents/ReadStudyInfoModalAndOut";
import UpdateNewStudyModal from "../../../components/StudyComponents/UpdateNewStudyModal";
import CreatWeeklySprintModal from "../../../components/StudyComponents/CreatWeeklySprintModal";
import "../style.css";
import { Button } from "react-bootstrap";

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
          <div className="studypage-inner-container goal-inner" style={{ height:"50vh"}}>
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
              handleButtonClick={handleCreatePlusButtonClick}
              size="45"
            />
          </div>
        </div>
        {/* <div className="row ustify-content-center align-items-center">

          <div className="col-2">
            <p style={{ fontSize: "1.5em" }}>스터디 단어장</p>
          </div>
          <div className="col">
            <img className="btn" style={{ width: "4em" }} src={PlusBtn} />
          </div>
        </div> */}
        
        <div className="row card-row justify-content-center align-items-center"><div className="studypage-inner-container"></div>
          {/* <MyWordCard /> */}
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
    </div>
  );
};

export default StudyDetail;
