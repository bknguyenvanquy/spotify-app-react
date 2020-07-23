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

interface ArtistSearchResultProps {
    artists: Artist[]
}

interface ArtistSearchResultState {
    topTracks: Track[],
    loadingFlg: boolean
}

class ArtistSearchResult extends Component<ArtistSearchResultProps, ArtistSearchResultState> {

    // loadingFlg: boolean = false;

    constructor(props: ArtistSearchResultProps) {
        super(props);
        this.state = {
            topTracks: [],
            loadingFlg: false
        }
    }

    onSearchTopTrack = (artist: Artist) => {
        this.setState({ loadingFlg: true });
        axios.get(`artists/${artist.id}/top-tracks?country=US`)
            .then((response: any) => {
                this.setState({ topTracks: response.data.tracks, loadingFlg: false });
                // this.loadingFlg = false;
            });
    }

    render() {
        return (
            <div>
                <WrapListArtists>
                    {
                        this.props.artists.map((artist: Artist) => {
                            return (
                                <ArtistItem className="card" key={artist.id} onClick={() => this.onSearchTopTrack(artist)}>
                                    <img className="card-img-top" src={artist.images[0] ? artist.images[0]?.url : '/unknown.png'} alt="Artist" />
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
                    this.state.loadingFlg ? <h5>Loading...</h5> : <ArtistTopTrack topTracks={this.state.topTracks}></ArtistTopTrack>
                }
            </div>
        );
    }
}

export default ArtistSearchResult;