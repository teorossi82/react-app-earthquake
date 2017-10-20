import React from 'react';

import './video_list_item.scss';
import { truncate } from '../utils/utils';

const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    <div onClick={() => onVideoSelect(video)} className="video_list_item list-group-item">
      <div className="media">
        <div className="media_left">
          <img alt={video.snippet.title} className="media_object" src={imageUrl} />
        </div>
        <div className="media_body">
          <div className="media_heading">{truncate(video.snippet.title, 30, true)}</div>
          <div className="media_desc">{truncate(video.snippet.description, 50, true)}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoListItem;
