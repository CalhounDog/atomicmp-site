import * as L from 'leaflet';
import { Icon } from 'leaflet';
import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { playerArrow } from "../images/map-markers";
import IUser from '../models/IUser';
import { mapImagePointToLatLng } from '../utils/helpers';

interface IMapPlayerProps {
  user: IUser;
  x: number;
  y: number;
  fill: string;
}

class MapPlayer extends React.Component<IMapPlayerProps, any> {

  public render() {
    const iconDimension = 20;

    const locationIcon: Icon = new L.Icon({
      iconRetinaUrl: playerArrow,
      iconSize: new L.Point(iconDimension, iconDimension),
      iconUrl: playerArrow,
    });

    const location = mapImagePointToLatLng({ x: this.props.x, y: this.props.y })

    console.log(this.props.user.username)
    console.log(location)
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
