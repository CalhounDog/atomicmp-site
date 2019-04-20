import * as L from 'leaflet';
import { Icon } from 'leaflet';
import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { mapImagePointToLatLng } from 'src/utils/helpers';
import { playerArrow } from "../images/map-markers";

class MapPlayer extends React.Component<any, any> {
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
          <span>{this.props.id}</span>
        </Popup><title>{this.props.id}</title>
      </Marker>
    )
  }
}

export default MapPlayer;
