import React, { Component } from 'react';
import Popup from "reactjs-popup";
import PopupWindow from '../PopupWindow';
import './index.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state={
      track:this.props.track,
      open:false
    }
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(){
    this.setState({ open: true });
  }

  closeModal(){
    this.setState({ open: false });
  }

  handleClick(event){
    event.preventDefault();
    this.props.handleClick(this.state.track.id);
  }

  render() {
    const track = this.state.track;
    const actionText = this.props.action === "+" ? "Add to Playlist" : "Remove from Playlist";
    return (
      <div className="Track">
        <Popup
           open={this.state.open}
           closeOnDocumentClick
           onClose={this.closeModal}
         >
          <PopupWindow
            track={track}
            actionText={actionText}
            handleClick={this.props.handleClick.bind(this)}
            closeModal={this.closeModal.bind(this)}
          />
         </Popup>
        <div className="Track-information">
          <h3>
            <a onClick={this.openModal.bind(this)} className={track.previewUrl ? "Track-action Green" : "Track-action Red"}>
              <i className="far fa-play-circle"></i>
            </a>
           {track.title}
          </h3>
          <p>{track.artists}</p>
          <p>{track.album}</p>
        </div>
        <a onClick={this.handleClick.bind(this)} className="Track-action">{this.props.action}</a>
      </div>
    );
  }
}

export default Track;
