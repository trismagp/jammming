import React, { Component } from 'react';
import './index.css';

class Track extends Component {
  state={
    track:this.props.track
  }

  handleClick(event){
    event.preventDefault();
    this.props.handleClick(this.state.track.id);
  }

  render() {
    const track = this.state.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.title}</h3>
          <p>{track.singer} | {track.album}</p>
        </div>
        <a onClick={this.handleClick.bind(this)} className="Track-action">{this.props.action}</a>
      </div>
    );
  }
}

export default Track;
