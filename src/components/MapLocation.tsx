import * as L from 'leaflet';
import { Icon } from 'leaflet';
import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { mapImagePointToLatLng } from 'src/utils/helpers';

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

  constructor(props: IMapLocationProps) {
    super(props);
  }

  public render() {
    const iconDimension = 40;

    const locationIcon: Icon = new L.Icon({
      iconAnchor: undefined,
      iconRetinaUrl: this.props.icon,
      iconSize: new L.Point(iconDimension, iconDimension),
      iconUrl: this.props.icon,
      popupAnchor: undefined,
      shadowAnchor: undefined,
      shadowSize: undefined,
      shadowUrl: undefined,
    });

    const location = mapImagePointToLatLng({ x: this.props.x, y: this.props.y})

    return (

      <Marker position={location} icon={locationIcon}>
        <Popup>
          <span>{this.props.id}</span>
        </Popup><title>{this.props.id}</title>
      </Marker>
    )
  }
}

export default MapLocation;
