import React, { Component } from 'react'
import { Artist } from '../../models/Artist.model';
import styled from 'styled-components';
import axios from 'axios';
import { Track } from '../../models/Track.model';
import ArtistTopTrack from './artist-top-track/ArtistTopTrack';

const WrapListArtists = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    max-height: 500px;
    overflow-y: scroll;
`

const ArtistItem = styled.div`
    width: 22%;
    margin: 10px;
    cursor: pointer;
`

const CardBody = styled.div`    
    padding: 10px;
`

const CardImage = styled.img`
    border-radius: 50%;
`

interface ArtistSearchResultProps {
    artists: Artist[];
}

interface ArtistSearchResultState {
    topTracks: Track[];
    loadingFlg: boolean;
    errorFlg: boolean;
}

class ArtistSearchResult extends Component<ArtistSearchResultProps, ArtistSearchResultState> {
    constructor(props: ArtistSearchResultProps) {
        super(props);
        this.state = {
            topTracks: [],
            loadingFlg: false,
            errorFlg: false
        }
    }

    onSearchTopTrack = (artist: Artist) => {
        this.setState({ loadingFlg: true, errorFlg: false });
        axios.get(`artists/${artist.id}/top-tracks?country=US`)
            .then((response: any) => {
                this.setState({ topTracks: response.data.tracks, loadingFlg: false });
            })
            .catch(err => {
                this.setState({ loadingFlg: false, errorFlg: true });
                console.log(err);
            });
    }

    render() {
        let result; 
        if (this.state.loadingFlg) {
            result = <h5>Loading...</h5>
          } else if (this.state.errorFlg) {
            result = <h5>Load Data Fail.</h5>
          } else {
            result = <ArtistTopTrack topTracks={this.state.topTracks}></ArtistTopTrack>
          }
        return (
            <div>
                <WrapListArtists>
                    {
                        this.props.artists.map((artist: Artist) => {
                            return (
                                <ArtistItem className="card" key={artist.id} onClick={() => this.onSearchTopTrack(artist)}>
                                    <CardImage className="card-img-top" src={artist.images[1] ? artist.images[1]?.url : '/unknown.png'} alt="Artist" />
                                    <CardBody className="card-body">
                                        <h5 className="card-title">{artist.name}</h5>
                                        <p className="card-text">Genres: {artist.genres[0] ? artist.genres[0] : 'Unknow'}</p>
                                        <p className="card-text">Popularity: {artist.popularity}</p>
                                    </CardBody> 
                                </ArtistItem>
                            );
                        })
                    }
                </WrapListArtists>
                <br /><br />
                {
                    result
                }
            </div>
        );
    }
}

export default ArtistSearchResult;