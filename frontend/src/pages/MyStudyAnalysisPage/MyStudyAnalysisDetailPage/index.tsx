import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function MyStudyAnalysisDetailPage() {
  // 선택된 아이템을 state로 관리
  const [selectedItem, setSelectedItem] = useState("Item 1");

  return (
    <div className="container-fluid">
      <div className="row">
        {/* 왼쪽 70% */}
        <div className="col-md-8">
          <div id="list-example" className="list-group">
            {/* 가로로 배치된 a 태그들로 변경 */}
            <div className="d-flex">
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 1" && "active"}`}
                onClick={() => setSelectedItem("Item 1")}
              >
                Item 1
              </a>
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 2" && "active"}`}
                onClick={() => setSelectedItem("Item 2")}
              >
                Item 2
              </a>
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 3" && "active"}`}
                onClick={() => setSelectedItem("Item 3")}
              >
                Item 3
              </a>
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 4" && "active"}`}
                onClick={() => setSelectedItem("Item 4")}
              >
                Item 4
              </a>
            </div>
          </div>
          <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-offset="0"
            className="scrollspy-example"
            tabIndex={0}
          >
            {/* 각 섹션의 스타일을 수정 */}
            <div style={{ display: selectedItem === "Item 1" ? "block" : "none" }}>
              <h4 id="list-item-1">Item 1</h4>
              <p>...</p>
            </div>
            <div style={{ display: selectedItem === "Item 2" ? "block" : "none" }}>
              <h4 id="list-item-2">Item 2</h4>
              <p>...</p>
            </div>
            <div style={{ display: selectedItem === "Item 3" ? "block" : "none" }}>
              <h4 id="list-item-3">Item 3</h4>
              <p>...</p>
            </div>
            <div style={{ display: selectedItem === "Item 4" ? "block" : "none" }}>
              <h4 id="list-item-4">Item 4</h4>
              <p>...</p>
            </div>
          </div>
        </div>
        {/* 오른쪽 30% */}
        <div className="col-md-4">
          <div className="script-container">{/* 오른쪽에 텍스트를 넣어주세요 */}</div>
        </div>
      </div>
    </div>
  );
}

export default MyStudyAnalysisDetailPage;
