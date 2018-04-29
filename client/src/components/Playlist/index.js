import React, { Component } from 'react';
import Track from '../Track';
import './index.css';



class Playlist extends Component {


  renderTracks(){
    return this.props.playlist.map((track,i)=>{
      return <Track key={i} track={track}  handleClick={this.props.removeFromPlaylist} action="-"/>
    });
  }

  handleChange(event){
    this.props.updatePlaylistName(event.target.value);
  }

  handleClick(event){
    this.props.savePlaylist(this.props.playlistName);
  }

  render() {


    return (
      <div className="Playlist">
        <input placeholder='New Playlist' value={this.props.playlistName} onChange={this.handleChange.bind(this)}/>
        <div className="TrackList">
          {this.renderTracks()}
        </div>
        {this.props.btnPlaylistSaveActive?
          <a onClick={this.handleClick.bind(this)} className="Playlist-save">SAVE TO SPOTIFY</a>
          :
          <a className="Playlist-disabled">SAVE TO SPOTIFY</a>
        }
      </div>
    );
  }
}

export default Playlist;
