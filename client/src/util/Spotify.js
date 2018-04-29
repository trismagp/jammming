
let tracks = [];

const Spotify = {
  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  },
  async refreshToken(){
    const params = this.getHashParams();
    const refresh_token = params.refresh_token;

    const url= '/api/refresh_token';
    return await fetch(url,{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "refresh_token": refresh_token
      })
    }).then(response =>{
        return response.ok;
    });
  },
  getAccessToken(){
    const params = this.getHashParams();
    const access_token = params.access_token;
    const error = params.error;
    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {
        return params;
      }
      return false;
    }
  },
  async search(access_token, searchString){
    try{
      const url = `https://api.spotify.com/v1/search?q=*${searchString}*&type=track`;
      const tracklist = await fetch(url,{
        headers:{"Authorization":`Bearer ${access_token}`}
      }).then(response =>{
          return response.json();
      }).then(jsonResponse=>{
        if(jsonResponse.tracks){
          tracks = jsonResponse.tracks.items.map(track=>{
            return{
              id:track.id,
              title:track.name,
              singer:track.artists[0].name,
              album:track.album.name
            };
          });
          return tracks;
        };
      });
      return tracklist;
    }catch(error){
      console.log(error);
    }
  },

  async getUserId(token){
    const url ='https://api.spotify.com/v1/me';
    var userId = await fetch(url,{
      headers:{"Authorization":`Bearer ${token}`},
      json:true
    }).then(response =>{
      console.log(response);
      return response.json();
    }).then(jsonResponse=>{
      return jsonResponse.id;
    });
    return userId;
  },
  async savePlaylistName(token,userId,playlistName){
    let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    var playlistId = await fetch(url,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        "name":playlistName,
        "description":"cool music",
        "public":false
      })
    }).then(response =>{
      return response.json();
    }).then(jsonResponse=>{
      return jsonResponse.id;
    });
    return playlistId;
  },
  async savePlaylist(token,playlistName,playlist){
    const userId = await this.getUserId(token);
    const playlistId = await this.savePlaylistName(token,userId,playlistName);
    const trackIds = playlist.map(track => track.id);

    const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?position=0&uris=spotify:track:`;
    const urlWithTracks = url + trackIds.join(',spotify:track:');

    const playlistSaved = await fetch(urlWithTracks,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      }
    }).then(response =>{
      return response.ok;
    });
    return playlistSaved;
  }
}
export default Spotify;
