import { useEffect, useState } from "react";

import "./proceeding_style.css";
import { imageURL } from "../../../pages/MatchingGamePage/constants/constants";

interface props {
  player: PlayerProfile;
  opponent: PlayerProfile;
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

const GameProceedingHeader: React.FC<props> = ({ player, opponent }) => {
  return (
    <div className="game-proceeding-header-container">
      <div className="matching-game-container"></div>
      <Profile
        nickname={player.nickname}
        profile={player.profile}
        ranking={player.ranking}
        tierImage={player.tierImage}
      ></Profile>
      <Profile
        nickname={opponent.nickname}
        profile={opponent.profile}
        ranking={opponent.ranking}
        tierImage={opponent.tierImage}
      ></Profile>
    </div>
  );
};

export default GameProceedingHeader;

interface Image {
  image: string;
}

const Profile: React.FC<PlayerProfile> = ({
  nickname,
  profile,
  ranking,
  tierImage,
}) => {
  return (
    <div className="game-proceeding-profile-container">
      <img
        src={imageURL + profile}
        className="game-proceeding-profile-image"
      ></img>
      <div className="profile-info">
        <div>{nickname}</div>
        <div>
          {ranking} {tierImage}
        </div>
      </div>
    </div>
  );
};
