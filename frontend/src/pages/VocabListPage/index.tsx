import { useState } from "react";
import MyWordCard from "../../components/MyWordCard";
import PlusBtn from "../../assets/Etc/PlusBtn.png";
import { Button } from "react-bootstrap";
import CreateNewListModal from "../../components/VocabListComponents/CreateNewListModal";
import "./style.css";

function VocabListPage() {
  const [showModal, setShowModal] = useState(false);

  const handlePlusButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="container mt-5">
      <div className="vocab-list-container row card-row justify-content-center align-items-center ">
        <div className="row justify-content-center align-items-center">
          <div className="col-2">
            <h1>내 단어장</h1>
          </div>
          <div className="col">
            <Button onClick={handlePlusButtonClick} style={{ backgroundColor: "white", borderColor: "white" }}>
              <img className="btn" src={PlusBtn} />
            </Button>
          </div>
        </div>
        <MyWordCard />
        <MyWordCard />
        <MyWordCard />
        <MyWordCard />
        <MyWordCard />
        <MyWordCard />
        <MyWordCard />
        <MyWordCard />
      </div>
      <div className="row card-row justify-content-center align-items-center custom-chart-container">
        <div className="row justify-content-center align-items-center">
          <div className="col-5">
            <h1>공개 단어장</h1>
          </div>
          <div className="col">
            <div className="container-fluid">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="검색" aria-label="Search" />
                <button className="btn" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="row">
            <MyWordCard />
            <MyWordCard />
            <MyWordCard />
            <MyWordCard />
            <MyWordCard />
            <MyWordCard />
            <MyWordCard />
            <MyWordCard />
          </div>
        </div>
      </div>
      <div className="create-new-list-modal">
        <CreateNewListModal showModal={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
}
export default VocabListPage;
