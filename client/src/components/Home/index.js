import React, { Component } from 'react';
import  {Redirect, withRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';
import AppPlaylist from '../AppPlaylist';
import Spotify from '../../util/Spotify';
import './index.css';

const playlistNameInit = 'New Playlist';

class Home extends Component {

  state = {
    access_token:'',
    refresh_token:'',
    tracks:[],
    playlist:[],
    playlistName:playlistNameInit,
    btnPlaylistSaveActive:false,
    redirect:false
  };


  async searchSpotify(searchString) {
    let {access_token,refresh_token} = Spotify.getAccessToken();
    if(!this.state.access_token){
      if(!access_token){
        this.setState({
          redirect:true
        });
        return;
      }else{
        this.setState({
          redirect:false,
          access_token:access_token,
          refresh_token:refresh_token
        });
      }
    }

    access_token = access_token || this.state.access_token;

    if(access_token){
      const tracks = await Spotify.search(access_token,searchString);
      if(tracks.length>0){
        this.setState({
          redirect:false,
          tracks:tracks
        });
        this.props.history.push('/');
        return tracks.length;
      }
    }else{
      return 0;
    }
  }

  addToPlaylist(trackId){
    const trackIndex = this.state.tracks.map(function(e){ return e.id}).indexOf(trackId);
    const tracksTemp = this.state.tracks;
    const playlistTemp = this.state.playlist;
    const trackSelected = tracksTemp.splice(trackIndex,1);
    playlistTemp.push(trackSelected[0]);

    this.setState({
      playlist:playlistTemp,
      tracks:tracksTemp,
      btnPlaylistSaveActive:true
    });
  }

  removeFromPlaylist(trackId){
    const trackIndex = this.state.playlist.map(function(e){ return e.id }).indexOf(trackId);
    const playlistTemp = this.state.playlist;
    playlistTemp.splice(trackIndex,1);
    this.setState({
      playlist:playlistTemp
    });

    if(playlistTemp.length===0){
      console.log(playlistTemp.length);
      this.setState({
        btnPlaylistSaveActive:true
      });
    }
  }

  savePlaylist(playlistName){
    Spotify.savePlaylist(this.state.access_token,playlistName,this.state.playlist).then(saved=>{
      if(saved){
        this.setState({
          playlist:[],
          playlistName:playlistNameInit,
          btnPlaylistSaveActive:false
        });
        alert("Playlist saved!");
      }
    });
  }

  updatePlaylistName(newName){
    this.setState({playlistName:newName});
  }

  render() {
    if(this.state.redirect){
       return <Redirect to="/auth/login" />;
    }

    return (
      <div className="Home">
        <SearchBar searchSpotify={this.searchSpotify.bind(this)} />
        <AppPlaylist
          tracks={this.state.tracks}
          playlist={this.state.playlist}
          playlistName={this.state.playlistName}
          btnPlaylistSaveActive={this.state.btnPlaylistSaveActive}
          updatePlaylistName={this.updatePlaylistName.bind(this)}
          addToPlaylist={this.addToPlaylist.bind(this)}
          removeFromPlaylist={this.removeFromPlaylist.bind(this)}
          savePlaylist={this.savePlaylist.bind(this)}
        />
      </div>
    );
  }
}

export default withRouter(Home);
