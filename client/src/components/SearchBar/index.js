import React, { Component } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './index.css';

class SearchBar extends Component {
  state={
    searchString: localStorage.getItem('searchString') || ""
  };

  handleChange(event){
    this.setState({searchString:event.target.value});
    localStorage.setItem("searchString", event.target.value);
  }

  async handleClick(event){
    event.preventDefault();
    const nbTracks = await this.props.searchSpotify(this.state.searchString);
    if (nbTracks>0){
      this.setState({searchString:""});
      localStorage.setItem("searchString", "");
    }
  }

  async handleKeyPress(event){
      const nbTracks = await this.props.searchSpotify(this.state.searchString);
      if (nbTracks>0){
        this.setState({searchString:""});
        localStorage.setItem("searchString", "");
      }

  }

  render() {
    return (
          <KeyboardEventHandler
            handleKeys={['Enter']}
            onKeyEvent={this.handleKeyPress.bind(this)}>
            <div className="SearchBar">
            <input
              onChange={this.handleChange.bind(this)}
              type="text"
              placeholder="Enter A Song Title Please"
              value={this.state.searchString}
            />
            <a onClick={this.handleClick.bind(this)}>SEARCH</a>
            </div>
            </KeyboardEventHandler>

    );
  }
}

export default SearchBar;
