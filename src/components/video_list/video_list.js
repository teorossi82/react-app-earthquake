import React, { Component } from 'react';

import VideoListItem from '../video_list_item/video_list_item';

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.videos.length === 0) {
      return (
        <p>Nessun video caricato</p>
      );
    }
    return (
      <div className="list-group">
        {this.props.videos.map(video => {
          return (
            <VideoListItem
              onVideoSelect={this.handleClick}
              key={video.etag}
              video={video}
            />
          );
        })}
      </div>
    );
  }
}

export default VideoList;
