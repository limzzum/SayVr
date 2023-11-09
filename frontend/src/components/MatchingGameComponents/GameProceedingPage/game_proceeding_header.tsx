import{ useEffect, useState } from "react";

import "./proceeding_style.css";

interface props {
  player : PlayerProfile,
  opponent : PlayerProfile
}

interface PlayerProfile {
  userId?: number;
  nickname: string;
  ranking: number;
  tierImage: string;
  point?: number;
  winCnt?: number;
  profile: string;
}

const GameProceedingHeader: React.FC<props> = ({player, opponent}) => {
   
    return (
        <div  className="header-container">
            <div className="matching-game-container"></div>
            <Profile nickname={player.nickname} profile={player.profile} ranking={player.ranking} tierImage={player.profile}></Profile>
            <Profile nickname={opponent.nickname} profile={opponent.profile} ranking={opponent.ranking} tierImage={opponent.profile}></Profile>
        </div>    
    );

}

export default GameProceedingHeader;

interface Image{
  image : string
}

const Profile: React.FC<PlayerProfile> = ({nickname, profile, ranking, tierImage}) => {
  return (
    <div className="profile-container">
      <img src={profile} className="profile-image"></img>
      <div className="profile-info">
        <div>{nickname}</div>
        <div>{ranking} {tierImage}</div>
      </div>
        
    </div>
  );
}
