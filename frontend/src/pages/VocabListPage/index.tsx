import MyWordCard from "../../components/MyWordCard";
import PlusBtn from "../../assets/Etc/PlusBtn.png";
import "./style.css";
import { Button } from "react-bootstrap";

function VocabListPage() {
  const handlePlusButtonClick = () => {
    alert("추가하기 버튼이 클릭 되었습니다.");
    console.log("Plus 버튼이 클릭되었습니다!");
  };
  return (
    <div className="container">
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
    </div>
  );
}

export default VocabListPage;
