import * as React from "react";
import MapLocation from '../components/MapLocation';
import mapBackground from "../images/map.png";
import IUser from '../models/IUser';
import { playerCoordsToImg } from '../utils/helpers';
import locations from "../utils/locations"

const STARTING_COORDS = {
  x: 69449.953125,
  y: -26285.0,
  z: -5968.092285,
};

interface IMapProps {
  user: IUser;
}

interface IMapState {
  mapTheme: string;
  playerLocation?: {
    x: number;
    y: number;
  }
}

interface IFactionMemberPositionData {
  id: string;
  username: string;
  x_pos: number;
  y_pos: number;
  rotation: number;
}

// tslint:disable: max-classes-per-file
class Map extends React.Component<IMapProps, IMapState> {
  public state = {
    mapTheme: "default",
    playerLocation: {
      x: STARTING_COORDS.x,
      y: STARTING_COORDS.y
    }
  }
  constructor(props: IMapProps) {
    super(props);
    this.getMapStyle = this.getMapStyle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.fetchFactionMembers = this.fetchFactionMembers.bind(this);
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    this.setState(state => ({ ...state, playerLocation: playerCoordsToImg(this.props.user)}))
  }
  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  public render() {
    const mapBackgroundColor = this.getMapStyle();
    return (
      <div style={{
        backgroundColor: mapBackgroundColor,
        width: "100%",
      }}>
        <div style={Object.assign({
          backgroundColor: "black",
          backgroundImage: "url(" + mapBackground + ")",
          backgroundSize: "100%",
          height:"100%",
          opacity: 1,
          width: "100%",

        }, (mapBackgroundColor) ? {
            WebkitFilter: "grayscale(1) brightness(0.75) contrast(1.75)",
            filter: "gray",
            opacity: .80,
          } : {})}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="100%" height="100%"
            viewBox="0 0 2048 2048"
            id="map-svg"
          >
            {this.renderLocationIcons()}
            {this.renderPlayer()}
          </svg>
        </div>

      </div>
    );
  }

  public renderLocationIcons() {
    return locations.map(locationData => <MapLocation id={locationData.id} icon={locationData.icon} key={locationData.id} x={locationData.x} y={locationData.y}/>)
  }

  public renderPlayer() {
    if (this.state.playerLocation) {
      return (
        <g>
          <title>{this.props.user.username}</title>
          <circle cx={this.state.playerLocation.x} cy={this.state.playerLocation.y} stroke="black" strokeWidth={2} fill="green" r={5} />
        </g>
      )
    } 
    return;
  }

  public handleKeyPress(event: KeyboardEvent) {
    switch(event.keyCode) {
      case(49): {
        this.setState({mapTheme: "realistic"});
        break;
      }
      case(50): {
        this.setState({mapTheme: "green"});
        break;
      }
      case(51): {
        this.setState({mapTheme: "amber"});
        break;
      }
      case(52): {
        this.setState({mapTheme: "blue"});
        break;
      }
      case(53): {
        this.setState({mapTheme: "white"});
        break;
      }
    }
  }

  private getMapStyle(): (string | undefined) {
    const themes = {
      amber:"#2ecfff",
      blue:"#ffb642",
      green:"#1aff80",
      white:"#c0ffff",
    }
    return themes[this.state.mapTheme]
  }

}

export default Map;
