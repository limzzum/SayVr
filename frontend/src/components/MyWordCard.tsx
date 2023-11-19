import { useNavigate } from "react-router-dom";
import { PersonalDeckTitle } from "../api/VocabListAPI/FlashcardsAPI";
import AddButton from "./VocabListComponents/AddButton";
import { FaStar } from "react-icons/fa";
import "./wordcard.css";
interface MyWordCardProps {
  addNew: () => void;
  props?: PersonalDeckTitle;
  type: string;
}
function MyWordCard({ addNew, props, type }: MyWordCardProps) {
  const navigate = useNavigate();

  if (!props) {
    return (
      <>
        <div className="empty-title-card deck-title-card" onClick={addNew}>
          <div className="empty-add-button">
            <AddButton handleButtonClick={addNew} size="50" />
          </div>
        </div>
      </>
    );
  }
  const { wordCount, name, id, forkCount, nickname } = props;
  const handleNavigation = (id: number) => {
    navigate(`/flashcard/${id}`);
  };
  return (
    <div
      className="deck-title-card"
      onClick={() => {
        handleNavigation(id);
      }}
    >
      <div className="title-card-body">
        <div className="deck-title">
          <div className="deck-subtitle-name">
            <h2>{name && props ? name : ""}</h2>
          </div>
          <div>
            <h3 className="deck-subtitle-wordcount">{wordCount}</h3>
          </div>
        </div>
        {type === "public" && (
          <>
            <div className="nickname-public">
              <h3>{nickname !== null && nickname}</h3>
              <div className="fork-count">
                <FaStar color="gold" />
                {forkCount}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyWordCard;
