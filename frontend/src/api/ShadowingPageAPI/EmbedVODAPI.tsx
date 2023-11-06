import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

const youtubeAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    key: `${process.env.REACT_APP_YOUTUBE_API_KEY}`,
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
  maxResults = 24
): Promise<AxiosResponse<{ items: PlaylistItem[] }>> => {
  return youtubeAPI.get("/playlistItems", {
    params: {
      part: "snippet",
      maxResults,
      playlistId,
    },
  });
};