import PlusBtn from "../../assets/Etc/PlusBtn.png";
import MyWordCard from "../../components/MyWordCard";
import "./style.css";
function StudyPage() {
  return (
    <div className="container">
      <div className="studypage-container">
        <div className="row">
          <div className="col-4">
            <h1>오픽 공부 스터디</h1>
          </div>
          <div className="col-6">
            <button>
              <p>스터디 정보</p>
            </button>
          </div>
          <div className="col-2">
            <p>나는 방장</p>
          </div>
        </div>
        <div className="row">
          <h3>이곳은 규칙입니다</h3>
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
    </div>
  );
}

export default StudyPage;
