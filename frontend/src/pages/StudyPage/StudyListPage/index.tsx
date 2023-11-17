import React, { useEffect, useState } from "react";
import {
  StudySliceRequestDto,
  StudyInfoDto,
  getStudyListKeyWord,
} from "../../../api/StudyPageAPI/StudyAPI";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ReadStudyInfoModal from "../../../components/StudyComponents/ReadStudyInfoModal";
import CreateNewStudyModal from "../../../components/StudyComponents/CreatNewStudyModal";
import AllStudyCard from "../../../components/StudyComponents/AllStudyCard";
import "../../VocabListPage/style.css";

interface StudyListProps {
  changeView: (menu: string) => void;
  searchResult: StudyInfoDto[];
  searchParameter: StudySliceRequestDto;
  type: string;
}
const StudyListPage: React.FC<StudyListProps> = ({
  changeView,
  searchResult,
  searchParameter,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState(searchParameter.keyword);
  const [latestId, setLatestId] = useState(
    searchResult[searchResult.length - 1].studyId
  );
  const [readStudyInfo, setReadStudyInfo] = useState<StudyInfoDto>();

  const [studyInfoDtos, setStudyInfoDtos] = useState<StudyInfoDto[]>(
    searchResult ? searchResult : []
  );
  const [searchParams, setSearchParams] = useState<StudySliceRequestDto>({
    lastId: latestId,
    size: 9,
    keyword: keyword,
  });

  useEffect(() => {
    setSearchParams({
      lastId: latestId,
      size: 9,
      keyword: keyword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, latestId]);

  useEffect(() => {
    if (loading && hasMore) {
      console.log("is loading true? " + loading);
      setTimeout(() => {
        getStudyListKeyWord(searchParams)
          .then((res) => {
            const newStudys = res.data.data.studyInfoDtoList;
            console.log(" fetch new load");
            console.log(newStudys);
            if (newStudys.length === 0) {
              console.log("길이 0");
              setHasMore(false);
            } else {
              if (newStudys[newStudys.length - 1].studyId === latestId) {
                console.log("받은 응답 마지막 값이 현재 저장된값이랑 같음");
                setHasMore(false);
              } else {
                console.log(
                  "new last id :" +
                    newStudys[newStudys.length - 1].studyId +
                    " , old id: " +
                    latestId
                );
                //변경 부분 중복 거르고 적용함
                const filteredNewDecks = newStudys.filter(
                  (deck) =>
                    !studyInfoDtos.some(
                      (prevDeck) => prevDeck.studyId === deck.studyId
                    )
                );
                setLatestId(
                  filteredNewDecks[filteredNewDecks.length - 1].studyId
                );
                setStudyInfoDtos((prevDecks) => [
                  ...prevDecks,
                  ...filteredNewDecks,
                ]);
              }
            }
          })
          .catch((error) => {
            console.error("Error fetching decks", error);
          })
          .finally(() => {
            if (latestId === studyInfoDtos[studyInfoDtos.length - 1].studyId) {
              setLoading(false);
            } else {
              setTimeout(() => setLoading(false), 3000);
            }

            // setLoading(false);
          });
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleLoad = () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
  };
  useEffect(() => {
    console.log(latestId);
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 10
      ) {
        handleLoad();
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchResult) {
      // impossible?
      console.log("결과없이 페이지 불러와진 경우");
      alert("잘못된 접근입니다");
      // getPublicFlashcards()
      //   .then((res) => {
      //     let show: PersonalDeckTitle[] = res.data.data.personalDeckList;
      //     setPublicCardTitles(show);
      //     console.log(show);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching publicDeckList", error);
      //   });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const handleReadButtonClick = () => {
    setShowReadModal(true);
  };

  const handleReadCloseModal = () => {
    setShowReadModal(false);
  };

  const goToDetail = async (id: number) => {
    navigate(`/study/${id}`);
  };

  const handleSearch = async () => {
    getStudyListKeyWord(searchParams).then((res) => {
      let show: StudyInfoDto[] = res.data.data.studyInfoDtoList;
      setStudyInfoDtos(show);
      console.log(show);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  return (
    <>
      <div className="container mt-5 flex justify-content-center">
        <div className="vocab-list-container row card-row">
          <div className="vocab-list-title row">
            <div className="row justify-content-center align-items-center">
              <div className="list-title-buttons">
                <div className="card-title">
                  <div>
                    <BackArrow />
                  </div>

                  <div>
                    <h1>모든 스터디</h1>
                  </div>

                  <div
                    className="container-fluid search-bar"
                    style={{ width: "300px" }}
                  >
                    <InputGroup>
                      <Form.Control
                        placeholder="검색"
                        name="keyword"
                        onChange={handleInputChange}
                        value={keyword}
                        type="search"
                        aria-label="Text input with dropdown button"
                      />
                      <Button
                        type="submit"
                        onClick={(e: any) => {
                          e.preventDefault();
                          handleSearch();
                        }}
                        className="btn"
                      >
                        Search
                      </Button>
                    </InputGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row card-row">
            {/* {(studyInfoDtos == null || studyInfoDtos.length === 0) && (
              <>
                <AllStudyCard addNew={handlePlusButtonClick} />
              </>
            )} */}
            {studyInfoDtos?.map((study, index) => {
              return (
                <>
                  <AllStudyCard
                    key={"public" + index + study.studyId}
                    addNew={handlePlusButtonClick}
                    readStudy={handleReadButtonClick}
                    setReadStudyInfo={setReadStudyInfo}
                    props={study}
                  />
                </>
              );
            })}{" "}
            {loading && <Spinner animation="border" variant="primary" />}
          </div>
        </div>
        <div className="create-new-list-modal">
          <CreateNewStudyModal
            showModal={showModal}
            handleClose={handleCloseModal}
            goToDetail={goToDetail}
          />
        </div>
        <div className="create-new-list-modal">
          <ReadStudyInfoModal
            showModal={showReadModal}
            handleClose={handleReadCloseModal}
            goToDetail={goToDetail}
            readStudyInfo={readStudyInfo}
          />
        </div>
      </div>
    </>
  );
};
export default StudyListPage;
