import * as L from 'leaflet';
import * as React from 'react';
import { Popup, Marker } from 'react-leaflet';
import { playerArrow } from "../images/map-markers";
import IUser from '../models/IUser';
import { mapImagePointToLatLng } from '../utils/helpers';

interface IMapPlayerProps {
  user: IUser;
  x: number;
  y: number;
  fill: string;
  rotation: number;
}

class MapPlayer extends React.Component<IMapPlayerProps, any> {

  public render() {
    const iconDimension = 20;

    const locationIcon = new L.DivIcon({
      html: `<img 
        style="transform: rotate(${this.props.user.rotation}deg);"
        height="${iconDimension}px" 
        width="${iconDimension}px"
        src='${playerArrow}'>`
    });

    const location = mapImagePointToLatLng({ x: this.props.x, y: this.props.y })

    return (
      <Marker position={location} icon={locationIcon}>
        <Popup>
          <span>{this.props.user.username}</span>
        </Popup>
      </Marker>
    )
  }
}

export default MapPlayer;
