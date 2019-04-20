import * as L from 'leaflet';
import { Icon } from 'leaflet';
import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { mapImagePointToLatLng } from 'src/utils/helpers';
import { playerArrow } from "../images/map-markers";
import IUser from '../models/IUser';

interface IMapPlayerProps {
  user: IUser;
  x: number;
  y: number;
  fill: string;
}

class MapPlayer extends React.Component<IMapPlayerProps, any> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const iconDimension = 20;

    const locationIcon: Icon = new L.Icon({
      iconRetinaUrl: playerArrow,
      iconSize: new L.Point(iconDimension, iconDimension),
      iconUrl: playerArrow,
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
