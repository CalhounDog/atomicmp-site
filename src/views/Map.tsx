import * as React from "react";
import backend from 'src/utils/network';
import MapLocation from '../components/MapLocation';
import PlayerArrow from "../components/MapPlayer";
import "../css/Map.css";
import mapBackground from "../images/map.png";
import IUser from '../models/IUser';
import { playerCoordsToImg } from '../utils/helpers';
import locations from "../utils/locations"


const STARTING_COORDS = {
  x: 69449.953125,
  y: -26285.0,
};

interface IFactionMemberPositionData {
  id: string;
  username: string;
  x_pos: number;
  y_pos: number;
  rotation: number;
}

interface IMapProps {
  user: IUser;
}

interface IMapState {
  mapTheme: string;
  playerLocation?: {
    x: number;
    y: number;
    rotation?: number;
  },
  factionMembersData: IFactionMemberPositionData[]
}


// tslint:disable: max-classes-per-file
class Map extends React.Component<IMapProps, IMapState> {
  public state = {
    factionMembersData: [],
    mapTheme: "map-theme-realistic",
    playerLocation: STARTING_COORDS,
  }
  constructor(props: IMapProps) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.fetchFactionMembers = this.fetchFactionMembers.bind(this);
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    this.fetchFactionMembers().then(factionMembersData => {
      this.setState(state => ({ ...state, factionMembersData }))
    }).catch(console.error)
    this.setState(state => ({ ...state, playerLocation: playerCoordsToImg(this.props.user)}))
  }
  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  public render() {
    return (
      <div id="map-container" className={this.state.mapTheme}>
        <img src={mapBackground} style={{
          width:"100%",
        }}/>
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
          id="map-svg"
          style={{
            left: 0,
            position: "absolute",
            top: "68px",
            width: "100%",
            zIndex: 1,
          }}
        >
          {this.renderLocationIcons()}
          {this.renderPlayer()}
        </svg>
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
          <PlayerArrow x={this.state.playerLocation.x} y={this.state.playerLocation.y} fill="#af0606" />
        </g>
      )
    } 
    return;
  }

  public handleKeyPress(event: KeyboardEvent) {
    switch(event.keyCode) {
      case(49): {
        this.setState({mapTheme: "map-theme-realistic"});
        break;
      }
      case(50): {
        this.setState({mapTheme: "map-theme-green"});
        break;
      }
      case(51): {
        this.setState({mapTheme: "map-theme-amber"});
        break;
      }
      case(52): {
        this.setState({mapTheme: "map-theme-blue"});
        break;
      }
      case(53): {
        this.setState({mapTheme: "map-theme-white"});
        break;
      }
    }
  }

  private async fetchFactionMembers(): Promise<IFactionMemberPositionData[]> {
    const { data } = await backend.get('api/faction')
    return [...data];
  }
}

export default Map;
