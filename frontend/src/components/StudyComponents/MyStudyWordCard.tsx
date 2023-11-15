import { useNavigate } from "react-router-dom";
import { StudyDeckInfo } from "../../api/StudyPageAPI/StudyAPI";
import AddButton from "../../components/StudyComponents/AddButton";
import "./style.css";
interface MyWordCardProps {
  addNew: () => void;
  props?: StudyDeckInfo;
}
function MyStudyWordCard({ addNew, props }: MyWordCardProps) {
  const navigate = useNavigate();

  if (!props) {
    return (
      <>
        <div className="empty-title-studydeck" onClick={addNew}>
          <div className="empty-add-studydeckbutton">
            <AddButton handleButtonClick={addNew} size="50" />
          </div>
        </div>
      </>
    );
  }
  const { wordCount, name, studyDeckId } = props;
  const handleNavigation = (id: number) => {
    navigate(`/studycard/${id}`);
  };
  return (
    <div
      className="studydeck-title-card"
      onClick={() => {
        handleNavigation(studyDeckId);
      }}
    >
      <div className="title-studydeck-body">
        <div className="studydeck-title">
          <div className="studydeck-subtitle-name">
            <h2>{name && props ? name : ""}</h2>
          </div>
          <div>
            <h3 className="studydeck-subtitle-wordcount">{wordCount}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStudyWordCard;
