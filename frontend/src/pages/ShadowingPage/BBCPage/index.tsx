import React, { useState, useEffect } from "react";
import { getPlaylistItems, PlaylistItem } from "../../../api/ShadowingPageAPI/EmbedVODAPI";
import "./style.css";
import BBC from "../../../assets/YoutubeCard/BBC.png";
import { useNavigate } from "react-router-dom";

function BBCPage() {
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playlistId = "PLcetZ6gSk96-ayXj5thbTpbh2vHWpP08o";

    getPlaylistItems(playlistId)
      .then((response) => {
        setPlaylistItems(response.data.items);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      });
  }, [playlistItems]);

  return (
    <div className="container">
      <div className="BBCpage-container">
        <div className="youtube-profile-container">
          <img src={BBC} className="youtube-profile" alt="BBC Logo" />
        </div>
        <div className="row justify-content-start align-items-center">
          <div className="d-flex">
            {playlistItems.map((item) => (
              <div key={item.id}>
                <div
                  className="card"
                  style={{ width: "18rem", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/Shadowing/ShadowingDetailPage", { state: { videoId: item.snippet.resourceId.videoId } });
                  }}
                >
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    className="card-img-top video-thumbnail"
                  />
                  <div className="card-body">
                    <p className="card-text video-title" title={item.snippet.title}>
                      {item.snippet.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BBCPage;
