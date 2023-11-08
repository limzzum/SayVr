import { useRef } from "react";
import "./style.css";


interface props {
    image : string
}
const Body: React.FC<props> = ({image}) => {
  return (
    <div className="body-container">
        <div className="profile-container"></div>        
        <img src= {image} alt="profile image" className="profile-image"/>
        
    </div>
  );
}

export default Body;
