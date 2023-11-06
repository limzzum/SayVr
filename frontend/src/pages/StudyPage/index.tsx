import { useEffect, useState, useRef } from "react";
import {
  DeckDetailResponseDto,
  PersonalDeckTitle,
  getOneDeck,
  getPersonalFlashcards,
  getPublicFlashcards,
} from "../../api/VocabListAPI/FlashcardsAPI";
// import { readStudyMineList, studyInfoDto } from "../../api/StudyApi/StudyApi";
// import MyWordCard from "../../components/MyWordCard";
import AddButton from "../../components/VocabListComponents/AddButton";
// import CreateNewListModal from "../../components/VocabListComponents/CreateNewListModal";
// import StudyDetail from "./StudyDetailPage";
import "./style.css";
import Slider from "react-slick";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "react-bootstrap";
import React from "react";

interface ArrowProps {
  onClick: () => void;
}
const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // 한 번에 보여질 카드 수
  slidesToScroll: 3, // 넘어갈 카드 수
  arrows: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function StudyPage() {
  // const [showModal, setShowModal] = useState(false);
  // const [menu, setMenu] = useState("main");
  // const [selectedDeck, setSelectedDeck] = useState<DeckDetailResponseDto>();
  // const [studyInfoDtoList, setStudyInfoDtoList] = useState<studyInfoDto[]>();
  // const [publicCardTitles, setPublicCardTitles] =
  //   useState<PersonalDeckTitle[]>();
  // const sliderPersonal = useRef<Slider | null>(null);
  // const sliderPublic = useRef<Slider | null>(null);
  // const ArrowLeft = (props: ArrowProps) => {
  //   return (
  //     <>
  //       <Button
  //         style={{
  //           borderColor: "transparent",
  //           color: "black",
  //           backgroundColor: "transparent",
  //         }}
  //         onClick={props.onClick}
  //       >
  //         <BsArrowLeft />
  //       </Button>
  //     </>
  //   );
  // };
  // const ArrowRight = (props: ArrowProps) => {
  //   return (
  //     <>
  //       <Button
  //         style={{
  //           borderColor: "blue",
  //           color: "black",
  //           backgroundColor: "transparent",
  //         }}
  //         onClick={props.onClick}
  //       >
  //         <BsArrowRight />
  //       </Button>
  //     </>
  //   );
  // };
  // useEffect(() => {
  //   readStudyMineList()
  //     .then((res) => {
  //       let show: studyInfoDto[] = res.data.data.studyInfoDtoList;
  //       setStudyInfoDtoList(show);
  //       console.log(show);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching personalDeckList", error);
  //     });
  //   // getPublicFlashcards()
  //   //   .then((res) => {
  //   //     let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
  //   //     setPublicCardTitles(show);
  //   //     console.log(show);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error fetching publicDeckList", error);
  //   //   });
  // }, []);

  // const handlePlusButtonClick = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // // const goToDetail = (createdDeck: DeckResponse) => {
  // //   setSelectedDeck(createdDeck)
  // //   setMenu("detail")
  // // }

  // const goToDetail = async (id: number) => {
  //   await getOneDeck(id).then((res) => {
  //     console.log(res.data.data);
  //     setSelectedDeck(res.data.data);
  //   });
  //   setMenu("detail");
  // };

  return (
    <>
      {/* <div className="container mt-5 flex justify-content-center">
        {menu === "main" && (
          <>
            <div className="study-list-container row card-row  align-items-center ">
              <div className="row justify-content-center align-items-center">
                <div className="col">
                  <h1>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        내 스터디{" "}
                        <AddButton
                          handleButtonClick={handlePlusButtonClick}
                          size="50"
                        />{" "}
                      </div>
                      <div>
                        <ArrowLeft
                          onClick={() => sliderPersonal?.current?.slickPrev()}
                        />
                        <ArrowRight
                          onClick={() => sliderPersonal?.current?.slickNext()}
                        />
                      </div>{" "}
                    </div>
                  </h1>
                </div>
              </div>
              {(studyInfoDtoList == null || studyInfoDtoList.length !== 0) && (
                <>
                  <p>내 스터디가 없습니다</p>
                </>
              )}
              <Slider ref={sliderPersonal} {...carouselSettings}>
                {studyInfoDtoList?.map((deck, index) => {
                  return (
                    <>
                      {/* <MyWordCard
                        key={index + deck.id}
                        goTo={goToDetail}
                        addNew={handlePlusButtonClick}
                        props={deck}
                      /> */}
                    </>
                  );
                // })}
      //         </Slider>
      //       </div>
      //       <div className="row card-row justify-content-center align-items-center custom-chart-container">
      //         <div className="row justify-content-center align-items-center">
      //           <div className="col">
      //             <h1>
      //               <div
      //                 style={{
      //                   display: "flex",
      //                   justifyContent: "space-between",
      //                 }}
      //               >
      //                 <div
      //                   style={{ display: "flex", justifyContent: "center" }}
      //                 >
      //                   모든 스터디
      //                   <div
      //                     className="container-fluid"
      //                     style={{ width: "300px" }}
      //                   >
      //                     <form className="d-flex">
      //                       <input
      //                         className="form-control"
      //                         type="search"
      //                         placeholder="검색"
      //                         aria-label="Search"
      //                       />
      //                       <button className="btn" type="submit">
      //                         Search
      //                       </button>
      //                     </form>
      //                   </div>
      //                 </div>
      //                 <div>
      //                   <ArrowLeft
      //                     onClick={() => sliderPublic?.current?.slickPrev()}
      //                   />
      //                   <ArrowRight
      //                     onClick={() => sliderPublic?.current?.slickNext()}
      //                   />
      //                 </div>
      //               </div>
      //             </h1>{" "}
      //           </div>
      //           <div className="row">
      //             {/* <MyWordCard /> */}{" "}
      //             <Slider ref={sliderPublic} {...carouselSettings}>
      //               {publicCardTitles?.map((deck, index) => {
      //                 return (
      //                   <>
      //                     {/* <MyWordCard
      //                       key={"public" + index + deck.id}
      //                       goTo={goToDetail}
      //                       addNew={handlePlusButtonClick}
      //                       props={deck}
      //                     /> */}
      //                   </>
      //                 );
      //               })}
      //             </Slider>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="create-new-list-modal-study">
      //         {/* <CreateNewListModal
      //           showModal={showModal}
      //           handleClose={handleCloseModal}
      //           goToDetail={goToDetail}
      //         /> */}
      //       </div>
      //     </>
      //   )}
      //   {menu === "detail" && (
      //     <>{/* <DeckDetail props={selectedDeck} changeView={setMenu} /> */}</>
      //   )}
      // </div> */}
    // </>
  // );
}
export default StudyPage;
