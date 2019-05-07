import * as L from 'leaflet';
import { Icon } from 'leaflet';
import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { mapImagePointToLatLng } from '../utils/helpers';

interface IMapLocationProps {
  id: string;
  icon: string;
  x: number;
  y: number;
}

// tslint:disable-next-line: no-empty-interface
interface IMapLocationState {
}

class MapLocation extends React.Component<IMapLocationProps, Partial<IMapLocationState>> {
  public state = {}

  public render() {
    const iconDimension = 20;

    const locationIcon: Icon = new L.Icon({
      iconRetinaUrl: this.props.icon,
      iconSize: new L.Point(iconDimension, iconDimension),
      iconUrl: this.props.icon,
    });

    const location = mapImagePointToLatLng({ x: this.props.x, y: this.props.y})
    return (

      <Marker position={location} icon={locationIcon}>
        <Popup>
          {this.props.id}
        </Popup>
      </Marker>
    )
  }
}

export default MapLocation;
