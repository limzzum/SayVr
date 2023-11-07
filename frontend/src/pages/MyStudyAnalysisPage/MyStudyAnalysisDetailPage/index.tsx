import React, { useState } from "react";
import GetConversation from "../../../api/MyStudyAnalysisAPI/GetConversation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function MyStudyAnalysisDetailPage() {
  const [selectedItem, setSelectedItem] = useState("Item 1");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div id="list-example" className="list-group">
            <div className="d-flex">
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 1" && "active"}`}
                onClick={() => setSelectedItem("Item 1")}
              >
                1
              </a>
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 2" && "active"}`}
                onClick={() => setSelectedItem("Item 2")}
              >
                2
              </a>
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 3" && "active"}`}
                onClick={() => setSelectedItem("Item 3")}
              >
                3
              </a>
              <a
                className={`list-group-item list-group-item-action ${selectedItem === "Item 4" && "active"}`}
                onClick={() => setSelectedItem("Item 4")}
              >
                4
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
            <div style={{ display: selectedItem === "1" ? "block" : "none" }}>
              <h4 id="list-item-1">1</h4>
              <p>...</p>
            </div>
            <div style={{ display: selectedItem === "2" ? "block" : "none" }}>
              <h4 id="list-item-2">2</h4>
              <p>...</p>
            </div>
            <div style={{ display: selectedItem === "3" ? "block" : "none" }}>
              <h4 id="list-item-3">3</h4>
              <p>...</p>
            </div>
            <div style={{ display: selectedItem === "4" ? "block" : "none" }}>
              <h4 id="list-item-4">4</h4>
              <p>...</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="script-container">hello</div>
        </div>
      </div>
    </div>
  );
}

export default MyStudyAnalysisDetailPage;
