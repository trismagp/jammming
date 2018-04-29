import React, { Component } from 'react';
import Track from '../Track';
import './index.css';


class TrackList extends Component {

  renderTracks(){
    return this.props.tracks.map(track=>{
      return <Track key={track.id} track={track} handleClick={this.props.addToPlaylist} action="+"/>
    });
  }

  render() {
    return (
      <div className="TrackList">
        {this.renderTracks()}
      </div>
    );
  }
}

export default TrackList;
