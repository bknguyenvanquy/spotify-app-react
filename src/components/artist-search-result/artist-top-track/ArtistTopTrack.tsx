import React, { Component } from 'react';
import { Track } from '../../../models/Track.model';
import styled from 'styled-components';

const TrackItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`

const ListGroupStyle = styled.div`
    max-height: 500px;
    overflow-y: scroll;
`

const WrapImageTrack = styled.div`
    width: 150px;
    height: 150px;
`

const ImageTrack = styled.img`
    width: 100%;
    height: 100%;
`

const WrapContentTrack = styled.div`
    width: calc(100% - 200px);
`

const AudioStyle = styled.audio`
    width: 100%;
`

interface ArtistTopTracktProps {
    topTracks: Track[]
}

class ArtistTopTrack extends Component<ArtistTopTracktProps, any> {

    render() {
        return (
            <ListGroupStyle className="list-group">
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
                                    <hr />
                                    {
                                        track.preview_url ?
                                            <div><AudioStyle controls><source src={track.preview_url} /></AudioStyle></div> : <p className="mb-1">No Preview URL</p>
                                    }
                                </WrapContentTrack>
                            </TrackItem>
                        )
                    })
                }
            </ListGroupStyle>
        );
    }
}

export default ArtistTopTrack;