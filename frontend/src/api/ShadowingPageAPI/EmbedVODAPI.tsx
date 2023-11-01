// api.ts
import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyCXec2vao9cSFYtNLN5nbmNpt1bF4B1Umo";

const youtubeAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

export const getPlaylistItems = (
  playlistId: string,
  maxResults = 25
): Promise<AxiosResponse<{ items: PlaylistItem[] }>> => {
  return youtubeAPI.get("/playlistItems", {
    params: {
      part: "snippet",
      maxResults,
      playlistId,
    },
  });
};
