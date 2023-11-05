import React, { useEffect, useState } from "react";
import {
  PersonalDeckTitle,
  getPersonalFlashcards,
  getPublicFlashcards,
} from "../../../api/VocabListAPI/FlashcardsAPI";
interface DeckListProps {
  category: string;
  changeView: (menu: string) => void;
}
const DeckListPage: React.FC<DeckListProps> = ({ category, changeView }) => {
  const [personalCardTitles, setPersonalCardTitles] =
    useState<PersonalDeckTitle[]>();
  const [publicCardTitles, setPublicCardTitles] =
    useState<PersonalDeckTitle[]>();
  // const
  useEffect(() => {
    // 개인 단어장 목록 가져오기data.personalDeckList
    if (category === "personal") {
      getPersonalFlashcards()
        .then((res) => {
          let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
          setPersonalCardTitles(show);
          console.log(show);
        })
        .catch((error) => {
          console.error("Error fetching personalDeckList", error);
        });
    } else if (category === "public") {
      getPublicFlashcards()
        .then((res) => {
          let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
          setPublicCardTitles(show);
          console.log(show);
        })
        .catch((error) => {
          console.error("Error fetching publicDeckList", error);
        });
    }

    // console.log(personalCardTitles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="vocab-list-container row card-row justify-content-center align-items-center ">
          <div className="row justify-content-center align-items-center"></div>
        </div>
      </div>
    </>
  );
};
export default DeckListPage;
