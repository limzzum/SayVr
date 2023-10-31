import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import BBC from "../../../assets/YoutubeCard/BBC.png";

function BBCPage() {
  const [playlistItems, setPlaylistItems] = useState<any[]>([]);

  useEffect(() => {
    const apiUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
    const apiKey = "AIzaSyCXec2vao9cSFYtNLN5nbmNpt1bF4B1Umo";
    const playlistId = "PLcetZ6gSk969Tk3cxyIF0_RKRuM60zK9Q";

    const params = {
      part: "snippet",
      maxResults: 25,
      status: "",
      playlistId: playlistId,
      key: apiKey,
    };

    axios
      .get(apiUrl, { params })
      .then((response) => {
        setPlaylistItems(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="BBCpage-container">
        <div className="youtube-profile-container">
          <img src={BBC} className="youtube-profile" alt="BBC Logo" />
        </div>
        <div className="row justify-content-start align-items-center">
          <div className="d-flex">
            {playlistItems.map((item) => (
              <a
                key={item.id}
                href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
                className="playlist-item-link"
              >
                <div className="card" style={{width: "18rem"}}>
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    className="card-img-top video-thumbnail"
                  />
                  <div className="card-body">
                    <p className="card-text video-title">{item.snippet.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BBCPage;
