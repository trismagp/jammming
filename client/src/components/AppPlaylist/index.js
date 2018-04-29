import React, { Component } from 'react';
import SearchResults from '../SearchResults';
import Playlist from '../Playlist';
import './index.css';

class AppPlaylist extends Component {

  render() {
    return (
      <div className="App-playlist">
        <SearchResults
          tracks={this.props.tracks}
          addToPlaylist={this.props.addToPlaylist}
        />
        <Playlist
          playlist={this.props.playlist}
          playlistName={this.props.playlistName}
          btnPlaylistSaveActive={this.props.btnPlaylistSaveActive}
          updatePlaylistName={this.props.updatePlaylistName}
          removeFromPlaylist={this.props.removeFromPlaylist}
          savePlaylist={this.props.savePlaylist}
        />
      </div>
    );
  }
}

export default AppPlaylist;
