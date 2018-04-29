import React, { Component } from 'react';
import TrackList from '../TrackList';
import './index.css';

class SearchResults extends Component {
  state={
    tracks:this.props.tracks
  }

  render() {

    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.tracks} addToPlaylist={this.props.addToPlaylist} />
      </div>
    );
  }
}

export default SearchResults;
