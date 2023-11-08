import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import PlusBtn from "../../../assets/Etc/PlusBtn.png";
import MyWordCard from "../../../components/MyWordCard";
import { StudyDetailResponseDto,GoalDetailResponseDto, StudyDeckDetailResponseDto, getOneStudy } from "../../../api/StudyPageAPI/StudyAPI"
import ReadStudyInfoModalAndOut from "../../../components/StudyComponents/ReadStudyInfoModalAndOut"
import "../style.css";


const StudyDetail: React.FC = () => {
  const { id } = useParams()
  const [studyId, setStudyId] = useState(Number(id))
  const [studyDetailInfo, setStudyDetailResponseDto] = useState<StudyDetailResponseDto>();
  const [preWeeklySprintId,setPreWeeklySprintId] = useState<Number>(0);
  const [nextWeeklySprintId,setNextWeeklySprintId] = useState<Number>(0);
  const [goalInfo, setGoalInfo] = useState<GoalDetailResponseDto>();
  const [studyDeckList, setStudyDeckList] = useState<StudyDeckDetailResponseDto>();
  const [showReadModal, setShowReadModal] = useState(false);

  const handleReadPlusButtonClick = () => {
    setShowReadModal(true);
  };

  const handleReadCloseModal = () => {
    setShowReadModal(false);
  };


  useEffect(() => {
    if (id) {
      getOneStudy(studyId)
        .then((res) => {
          if(res.data.httpStatus === "OK") {
            let data = res.data.data;
            setStudyDetailResponseDto(data.studyDetailResponseDto);
            setPreWeeklySprintId(data.weeklySprintDetailResponse.preWeeklySprintId);
            setNextWeeklySprintId(data.weeklySprintDetailResponse.nextWeeklySprintId);
            setGoalInfo(data.weeklySprintDetailResponse.goalDetailResponseDto);
            setStudyDeckList(data.studyDeckDetailResponseDto);
          }
        })
        .catch((e) => console.log(e))
        // TODO : 회원 아닌 사람 예외처리하기 스터디 리스트 페이지로 돌려보내기
    }
  }, [id])

  return (
    <div className="container">
      <div className="studypage-container">
        <div className="row">
          <div className="col-4">
            <h1>{studyDetailInfo?.studyInfoDto.name}</h1>
          </div>
          <div className="col-6">
            <button onClick={handleReadPlusButtonClick}>
              <p>스터디 정보</p>
            </button>
          </div>
          <div className="col-2">
            <p>{studyDetailInfo?.nickName}</p>
          </div>
        </div>
        <div className="row">
          <h3>{studyDetailInfo?.studyInfoDto.rule}</h3>
          <hr></hr>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-2 justify-content-center align-items-center">
            <p style={{ fontSize: "1.5em" }}>스터디 목표</p>
          </div>
          <div className="col">
            <img className="btn" style={{ width: "4em" }} src={PlusBtn} />
          </div>
        </div>
        <div className="row ustify-content-center align-items-center">
          <div className="studypage-inner-container"></div>
        </div>
        <div className="row ustify-content-center align-items-center">
          <div className="col-2">
            <p style={{ fontSize: "1.5em" }}>스터디 단어장</p>
          </div>
          <div className="col">
            <img className="btn" style={{ width: "4em" }} src={PlusBtn} />
          </div>
        </div>
        <div className="row card-row justify-content-center align-items-center">
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
    </div>
  );
}

export default StudyDetail;
