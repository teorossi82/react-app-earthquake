import React from 'react';

import './video_list_item.scss';
import { truncate } from '../utils/utils';

const VideoListItem = ({ video, onVideoSelect, selected }) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  const renderIframeVideo = () => {
    const selectedId = selected && selected.id ? selected.id.videoId : null;
    const { videoId } = video.id;
    if (videoId !== selectedId) {
      return <div />;
    }
    const url = `https://www.youtube.com/embed/${videoId}`;
    return (
      <div className="box-iframeVideo embed-responsive embed-responsive-16by9">
        <div className="box-header">
          <button type="button" className="btn btn-xs btn-danger">
            <span onClick={() => onVideoSelect(null)} className="fa fa-times" />
          </button>
        </div>
        <iframe allowFullScreen className="embed-responsive-item" src={url} />
      </div>
    );
  };

  return (
    <div className="video_list_item list-group-item">
      {renderIframeVideo()}
      <div className="media" onClick={() => onVideoSelect(video)}>
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
