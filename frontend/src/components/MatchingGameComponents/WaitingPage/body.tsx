import { useRef } from "react";
import "./style.css";
import { imageURL } from "../../../pages/MatchingGamePage/constants/constants";

interface props {
  image?: string;
  rankPoint1?: number;
  name1?: string;
  opponent?: string;
  rankPoint2?: number;
  name2?: string;
  isMatch: boolean;
}
const Body: React.FC<props> = ({
  image,
  rankPoint1,
  name1,
  opponent,
  rankPoint2,
  name2,
  isMatch,
}) => {
  console.log("opponent image : " + opponent);
  if (!isMatch) {
    return (
      <div className="body-container">
        <div className="profile-container"></div>
        <img src={image} className="profile-image" />
        <div>{name1}</div>
      </div>
    );
  } else {
    return (
      <div className="body-container2">
        <div className="match-profile-container">
          <div className="match-profile-point">{rankPoint1}점</div>
          <img src={image} alt="profile" className="match-profile-image" />
          <div className="match-profile-name">{name1}</div>
        </div>
        <div className="vs-text"> VS </div>
        <div className="match-profile-container">
          <div className="match-profile-point">{rankPoint2}점</div>
          <img src={imageURL + opponent} className="match-profile-image" />
          <div className="match-profile-name">{name2}</div>
        </div>
        {/* <div> rankPoint1</div> */}
      </div>
    );
  }
};

export default Body;
