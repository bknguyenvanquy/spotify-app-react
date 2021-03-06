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
  artists: Artist[],
  currentSearchText: string;
  loadingFlg: boolean;
  errorFlg: boolean;
}

class App extends Component<any, AppState> {
  inputRef: any;
  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      artists: [],
      currentSearchText: '',
      loadingFlg: false,
      errorFlg: false
    }
  }

  onSearch = () => {
    this.setState({ loadingFlg: true, errorFlg: false });
    axios.get(`/search?q=${encodeURI(this.inputRef.current.value)}&type=artist`)
      .then((response: any) => {
        this.setState({ artists: response.data.artists.items, currentSearchText: this.inputRef.current.value, loadingFlg: false });
      })
      .catch(err => {
        this.setState({ loadingFlg: false, errorFlg: true });
      });
  }


  onSearchEnter = (e: any) => {
    if (e.keyCode !== 13) {
      return;
    } else {
      this.onSearch();
    }
  }

  render() {
    let result;
    if (this.state.loadingFlg) {
      result = <h5>Loading...</h5>
    } else if (this.state.errorFlg) {
      result = <h5>Load Data Fail.</h5>
    } else {
      result = !this.state.artists.length && !!this.inputRef.current?.value ? <h5>No Result.</h5> : <ArtistSearchResult artists={this.state.artists} key={this.state.currentSearchText}></ArtistSearchResult>
    }
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
              aria-describedby="basic-addon2"
              onKeyUp={this.onSearchEnter} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.onSearch}>Search</button>
            </div>
          </div>
          <div className="artists-search-result" style={{ width: '100%' }}>
            {
              result
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
