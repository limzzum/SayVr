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
      </div>
    );
  } else {
    return (
      <div className="body-container2">
        <div className="match-profile-container1">
          <img src={image} alt="profile" className="match-profile-image1" />
        </div>
        <div className="vs-text"> VS </div>
        <div className="match-profile-container2">
          <img src={imageURL + opponent} className="match-profile-image2" />
        </div>
        {/* <div> rankPoint1</div> */}
      </div>
    );
  }
};

export default Body;
