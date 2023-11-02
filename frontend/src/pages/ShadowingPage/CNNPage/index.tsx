import React, { useState, useEffect } from "react";
import { getPlaylistItems, PlaylistItem } from "../../../api/ShadowingPageAPI/EmbedVODAPI";
import "./style.css"
import CNN from "../../../assets/YoutubeCard/CNN.png"
import { useNavigate } from "react-router-dom";

function CNNPage() {
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playlistId = "PL6XRrncXkMaVXAutoJ8D2RDKAz_XufaFm";

    getPlaylistItems(playlistId)
      .then((response) => {
        setPlaylistItems(response.data.items);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      });
  }, [playlistItems]);

    return(
      <div className="container">
        <div className="CNNpage-container">
          <div className="youtube-profile-container">
            <img src={CNN} className="youtube-profile" alt="CNN Logo"/>
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
export default CNNPage