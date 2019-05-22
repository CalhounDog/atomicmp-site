import * as L from 'leaflet';
import * as React from 'react';
import { Popup, Marker } from 'react-leaflet';
import IUser from '../models/IUser';
import { mapImagePointToLatLng } from '../utils/helpers';

interface IMapPlayerProps {
  user: IUser;
  x: number;
  y: number;
  fill?: string;
  rotation: number;
  border?: string;
}

class MapPlayer extends React.Component<IMapPlayerProps, any> {

  public render() {
    const iconDimension = 20;
    const locationIcon = new L.DivIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 189" version="1.1"
        style="transform: rotate(${this.props.rotation}deg);"
        height="${iconDimension}px" 
        width="${iconDimension}px">
          <g id="map-player-${this.props.user.username}">
            <path style="
              fill:${this.props.border || "#000000"};
              fill-opacity:1;"
              d="M 123.820312 188.976562 L 63.808594 171.96875 L 5.316406 188.597656 L 0 184.441406 L 60.390625 0.0234375 L 67.226562 0.0234375 L 128 185.195312 L 123.820312 188.976562 M 106.351562 168.191406 L 63.808594 39.324219 L 21.648438 168.191406 L 63.808594 155.71875 L 106.351562 168.191406"
            />
            <path style="
              fill:${this.props.fill || "#ffffff"};
              fill-opacity:1;"
              d="M 106.351562 168.191406 L 63.808594 155.71875 L 21.648438 168.191406 L 63.808594 39.324219 L 106.351562 168.191406"
            />
          </g>
        </svg>`
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
