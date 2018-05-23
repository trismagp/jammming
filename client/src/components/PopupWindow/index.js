import React, { Component } from 'react';
import './index.css';

class PopupWindow extends Component {
  state={
    track:this.props.track
  }

  handleClick(event){
    event.preventDefault();
    this.props.handleClick(this.state.track.id);
    this.props.closeModal();
  }

  render() {
    return (
      <div className="PopupWindow">
        <div className="grid-container">
          <div className="grid-item item1">
            <h2 className="PopupWindow-header">Ja<span className="highlight">mmm</span>previewing</h2>
          </div>
          <div className="grid-item item2">
            <img src={this.state.track.albumImageUrl} alt={this.state.track.album} />
          </div>
          <div className="grid-item item3">
            <h5 className="label">Title</h5>
            <h4>{this.state.track.title}</h4>
            <br />
            <h5 className="label">Artists</h5>
            <h4>{this.state.track.artists}</h4>
            <br />
            <h5 className="label">Album</h5>
            <h4>{this.state.track.album}</h4>
            <br />
            <br />
            { this.state.track.previewUrl ?
                <div>
                  <audio controls="controls">
                   <source src={this.state.track.previewUrl} type="audio/mpeg" />
                   Your browser does not support the audio element.
                  </audio>
                </div>
              :
              <p className="notAvailable">Sorry track preview not available</p>
            }
            <br />
            <a onClick={this.handleClick.bind(this)} className="Playlist-add">{this.props.actionText}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupWindow;
