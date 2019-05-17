import React from "react";
import { playerCoordsToImg, mapImagePointToLatLng } from "../utils/helpers";
import { Icon } from "leaflet";
import * as L from 'leaflet';
import { Marker, Popup } from "react-leaflet";
import { playerArrow } from "../images/map-markers";

interface IMapFactionMemberProps {
  x: number;
  y: number;
  username: string;
}

class MapFactionMember extends React.Component<IMapFactionMemberProps, any> {
  public render() {

    const iconDimension = 20;

    const locationIcon: Icon = new L.Icon({
      iconRetinaUrl: playerArrow,
      iconSize: new L.Point(iconDimension, iconDimension),
      iconUrl: playerArrow,
    });

    const memberPosition = playerCoordsToImg({x_pos: this.props.x, y_pos: this.props.y})

    const location = mapImagePointToLatLng(memberPosition)

    console.log(this.props.username)
    console.log(location)

    return (
      <Marker position={location} icon={locationIcon}>
        <Popup>
          <span>{this.props.username}</span>
        </Popup>
      </Marker>
    )
  }
}

export default MapFactionMember;