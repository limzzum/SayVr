import { useRef } from "react";
import "./style.css";

interface props {
  image: string;
  rankPoint1: number;
  opponent?: string;
  rankPoint2?: number;
  isMatch: boolean;
}
const Body: React.FC<props> = ({ image, rankPoint1, opponent, rankPoint2, isMatch }) => {
  if (!isMatch) {
    return (
      <div className="body-container">
        <div className="profile-container"></div>
        <img src={image} alt="profile image" className="profile-image" />
      </div>
    );
  } else {
    return (
      <div className="body-container">
        <div className="profile-container"></div>
        {/* <div> rankPoint1</div> */}
        <img src={image} alt="profile image" className="profile-image" />
        <div className="profile-container"></div>
        {/* <div> rankPoint1</div> */}
        <img src={opponent} alt="profile image" className="profile-image2" />
      </div>
    );
  }
};

export default Body;
