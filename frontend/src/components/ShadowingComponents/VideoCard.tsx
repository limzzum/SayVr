import React from 'react';

interface VideoCardProps {
  imageUrl: string;
  title: string;
}

function VideoCard({ imageUrl, title }: VideoCardProps) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imageUrl} className="card-img-top" alt="Video Thumbnail" />
      <div className="card-body">
        <p className="card-text">{title}</p>
      </div>
    </div>
  );
}

export default VideoCard;
