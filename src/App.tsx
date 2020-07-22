import React, { Component } from 'react';
import axios from 'axios';
import { TOKEN } from './secret/Token';
import { Artist } from './models/Artist.model';
import ArtistSearchResult from './components/artist-search-result/ArtistSearchResult';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.baseURL = 'https://api.spotify.com/v1';
  config.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

interface AppState {
  artists: Artist[]
}

class App extends Component<any, AppState> {
  inputRef: any;
  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      artists: []
    }
  }
  onSearch = () => {
    axios.get(`/search?q=${encodeURI(this.inputRef.current.value)}&type=artist`)
      .then((response: any) => {
        this.setState({ artists: response.data.artists.items });
      });
  }
  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="input-group mb-3 input-field">
            <input type="text"
              ref={this.inputRef}
              className="form-control"
              placeholder="Search Artist"
              aria-label="Search Artist"
              aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.onSearch}>Search</button>
            </div>
          </div>
          <div className="artists-search-result" style={{width: '100%'}}>
            <ArtistSearchResult artists={this.state.artists}></ArtistSearchResult>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
