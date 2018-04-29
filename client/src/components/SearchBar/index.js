import React, { Component } from 'react';
import './index.css';

class SearchBar extends Component {
  state={
    searchString:''
  };

  handleChange(event){
    this.setState({searchString:event.target.value});
  }

  handleClick(event){
    event.preventDefault();
    this.props.searchSpotify(this.state.searchString);
  }


  render() {
    return (
        <div className="SearchBar">
          <input onChange={this.handleChange.bind(this)} placeholder="Enter A Song Title Please" />
          <a onClick={this.handleClick.bind(this)}>SEARCH</a>
        </div>
    );
  }
}

export default SearchBar;
