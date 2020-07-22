import React, { Component } from 'react'
import { Artist } from '../../models/Artist.model';
import styled from 'styled-components';
import axios from 'axios';
import { Track } from '../../models/Track.model';
import ArtistTopTrack from './artist-top-track/ArtistTopTrack';

const WrapListArtists = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const ArtistItem = styled.div`
    width: 22%;
    margin: 10px;
`

interface ArtistSearchResultProps {
    artists: Artist[]
}

interface ArtistSearchResultState {
    topTracks: Track[]
}

class ArtistSearchResult extends Component<ArtistSearchResultProps, any> {
    constructor(props: ArtistSearchResultProps) {
        super(props);
        this.state = {
            topTracks: []
        }
    }

    onSearchTopTrack = (artist: Artist) => {
        axios.get(`artists/${artist.id}/top-tracks?country=US`)
            .then((response: any) => {
                this.setState({ topTracks: response.data.tracks });
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
                                    <img className="card-img-top" src={artist.images[0] ? artist.images[0]?.url : '/logo512.png'} alt="Artist" />
                                    <div className="card-body">
                                        <h5 className="card-title">{artist.name}</h5>
                                        <p className="card-text">{artist.genres[0]}</p>
                                        <p className="card-text">{artist.popularity}</p>
                                    </div>
                                </ArtistItem>
                            );
                        })
                    }
                </WrapListArtists>
                <br /><br />
                <ArtistTopTrack topTracks={this.state.topTracks}></ArtistTopTrack>
            </div>
        );
    }
}

export default ArtistSearchResult;