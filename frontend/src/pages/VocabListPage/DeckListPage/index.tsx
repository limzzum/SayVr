import React, { useEffect, useState } from "react";
import {
  DeckDetailResponseDto,
  PersonalDeckTitle,
  getOneDeck,
  getPersonalFlashcards,
  getPublicFlashcards,
} from "../../../api/VocabListAPI/FlashcardsAPI";
import AddButton from "../../../components/VocabListComponents/AddButton";
import MyWordCard from "../../../components/MyWordCard";
import CreateNewListModal from "../../../components/VocabListComponents/CreateNewListModal";
import "../../VocabListPage/style.css";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "react-bootstrap";

interface DeckListProps {
  category: string;
  changeView: (menu: string) => void;
}
const DeckListPage: React.FC<DeckListProps> = ({ category, changeView }) => {
  const [showModal, setShowModal] = useState(false);
  // const [menu, changeView] = useState("");
  //!! selected deck  도 올려주기
  const [selectedDeck, setSelectedDeck] = useState<DeckDetailResponseDto>();
  const [personalCardTitles, setPersonalCardTitles] =
    useState<PersonalDeckTitle[]>();
  // const
  useEffect(() => {
    // 개인 단어장 목록 가져오기data.personalDeckList
    if (category === "private") {
      getPersonalFlashcards()
        .then((res) => {
          console.log("왜 안와?");
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
          setPersonalCardTitles(show);
          console.log(show);
        })
        .catch((error) => {
          console.error("Error fetching publicDeckList", error);
        });
    }

    // console.log(personalCardTitles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  const BackArrow = () => {
    return (
      <>
        <Button
          style={{
            borderColor: "transparent",
            color: "black",
            backgroundColor: "transparent",
            width: "50px",
          }}
          onClick={() => changeView("main")}
        >
          <BsChevronLeft />
        </Button>
      </>
    );
  };
  const handlePlusButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const goToList = (where: string) => {
  //   changeView(where);
  // };

  const goToDetail = async (id: number) => {
    await getOneDeck(id).then((res) => {
      console.log(res.data.data);
      setSelectedDeck(res.data.data);
    });
    changeView("detail");
  };

  return (
    <>
      <div className="container mt-5 flex justify-content-center">
        <div className="vocab-list-container row card-row  align-items-center ">
          <div className="row justify-content-center align-items-center">
            <div className="col">
              <h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", margin: "1rem" }}>
                    <div>
                      <BackArrow />
                    </div>
                    <div
                      className="title"
                      style={{ display: "inline-flex" }}
                      onClick={() => changeView("main")}
                    >
                      {category === "private" && (
                        <>
                          내 단어장
                          <div>
                            <AddButton
                              handleButtonClick={handlePlusButtonClick}
                              size="50"
                            />
                          </div>
                        </>
                      )}
                      {category === "public" && (
                        <>
                          공개 단어장
                          <div
                            className="container-fluid"
                            style={{ width: "300px" }}
                          >
                            <form className="d-flex">
                              <input
                                className="form-control"
                                type="search"
                                placeholder="검색"
                                aria-label="Search"
                              />
                              <button className="btn" type="submit">
                                Search
                              </button>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </h1>
            </div>
          </div>
          {(personalCardTitles == null || personalCardTitles.length === 0) && (
            <>
              <MyWordCard goTo={goToDetail} addNew={handlePlusButtonClick} />
            </>
          )}
          {personalCardTitles?.map((deck, index) => {
            return (
              <>
                <MyWordCard
                  key={index + deck.id}
                  goTo={goToDetail}
                  addNew={handlePlusButtonClick}
                  props={deck}
                />
              </>
            );
          })}
        </div>
        <div className="create-new-list-modal">
          <CreateNewListModal
            showModal={showModal}
            handleClose={handleCloseModal}
            goToDetail={goToDetail}
          />
        </div>
      </div>
    </>
  );
};
export default DeckListPage;
