import React, { Component } from 'react';
import { Track } from '../../../models/Track.model';
import styled from 'styled-components';

const TrackItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`

const WrapImageTrack = styled.div`
    width: 200px;
    height: 200px;
`

const ImageTrack = styled.img`
    width: 100%;
    height: 100%;
`

const WrapContentTrack = styled.div`
    width: calc(100% - 250px);
`

interface ArtistTopTracktProps {
    topTracks: Track[]
}

class ArtistTopTrack extends Component<ArtistTopTracktProps, any> {
    constructor(props: ArtistTopTracktProps) {
        super(props);
    }

    render() {
        
        console.log(this.props);
        return (
            <div className="list-group">
                {
                    this.props.topTracks.map((track: Track) => {
                        return (
                            <TrackItem key={track.id} className="list-group-item list-group-item-action">
                                <WrapImageTrack>
                                    <ImageTrack src={track.album.images[1] ? track.album.images[1].url : '/logo512.png'} alt="Track"/>
                                </WrapImageTrack>
                                <WrapContentTrack>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{track.name}</h5>
                                        <small>{track.album.release_date}</small>
                                    </div>
                                    <h6>Type: {track.type}</h6>
                                    <br />
                                    <hr />
                                    {
                                        track.preview_url ?
                                            <div><audio controls><source src={track.preview_url} /></audio></div> : <p className="mb-1">No Preview URL</p>
                                    }
                                </WrapContentTrack>
                            </TrackItem>
                        )
                    })
                }
            </div>
        );
    }
}

export default ArtistTopTrack;