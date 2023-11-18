import { StudyInfoDto } from "../../api/StudyPageAPI/StudyAPI";
import AddButton from "./AddButton";
import "../wordcard.css";
import { BsPerson } from "react-icons/bs";
interface StudyCardProps {
  addNew: () => void;
  readStudy: () => void;
  props?: StudyInfoDto;
  setReadStudyInfo: (info: StudyInfoDto) => void;
}
function AllStudyCard({
  addNew,
  readStudy,
  setReadStudyInfo,
  props,
}: StudyCardProps) {
  if (!props) {
    return (
      <>
        <div className="emtpy-title-card" onClick={addNew}>
          <div
            className="empty-add-button"
            style={{ justifyContent: "center" }}
          >
            <AddButton handleButtonClick={addNew} size="50" />
          </div>
        </div>
      </>
    );
  }
  const { maxPeople, currentPeople, name, studyId } = props;
  return (
    <div
      className="deck-title-card"
      onClick={() => {
        readStudy();
        setReadStudyInfo(props);
      }}
    >
      <div className="title-card-body">
        <div style={{ display: "flex" }}>
          <div className="subtitle-name">
            <h2 className="card-title">{name && props ? name : ""}</h2>
          </div>
        </div>
        <div
          className="card-subtitle mb-2 text-muted"
          style={{
            marginLeft: "1rem",
            textAlign: "left",
            alignItems: "baseline",
            display: "flex",
          }}
        >
          <h3>
            <BsPerson />
            {currentPeople}/{maxPeople}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AllStudyCard;
