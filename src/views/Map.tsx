import { CRS, LatLngBounds } from 'leaflet';
import * as React from "react";
import {
  ImageOverlay,
  Map as LeafletMap,
} from "react-leaflet";
import MapLocation from '../components/MapLocation';
import PlayerArrow from "../components/MapPlayer";
import "../css/Map.css";
import mapBackground from "../images/map.png";
import IUser from '../models/IUser';
import { mapImagePointToLatLng } from '../utils/helpers';
import { playerCoordsToImg } from '../utils/helpers';
import locations from "../utils/locations";
import backend from '../utils/network';

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
  zoom: number;
  factionMembersData: IFactionMemberPositionData[]
}

// tslint:disable: max-classes-per-file
class Map extends React.Component<IMapProps, IMapState> {
  public state = {
    factionMembersData: [],
    mapTheme: "map-theme-realistic",
    maxZoom: 3,
    minZoom: -1,
    playerLocation: STARTING_COORDS,
    zoom: 1,
  }
  constructor(props: IMapProps) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.fetchFactionMembers = this.fetchFactionMembers.bind(this);
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    // this.fetchFactionMembers().then(factionMembersData => {
    //   this.setState(state => ({ ...state, factionMembersData }))
    // }).catch(console.error)
    this.setState(state => ({ ...state, playerLocation: playerCoordsToImg(this.props.user)}))
  }
  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  public render() {

    const w = 2048;
    const h = 2048;

    const southWest: [number, number] = [0, h];
    const northEast: [number, number] = [w, 0];
    const bounds = new LatLngBounds(southWest, northEast);

    const playerPosition = mapImagePointToLatLng({x: this.state.playerLocation.x, y: this.state.playerLocation.y});
    const position: [number, number] = [playerPosition.lat, playerPosition.lng];
    return (
      <LeafletMap
        style={{
          bottom: "0px",
          position:"absolute",
          top: "68px",
          width: "100%",
        }}
        center={position}
        zoom={this.state.zoom}
        minZoom={this.state.minZoom}
        maxZoom={this.state.maxZoom}
        zoomDelta={0.25}
        zoomSnap={0.25}
        maxBound={bounds}
        continuousWorld={false}
        crs={CRS.Simple}
      >
        <ImageOverlay
          url={mapBackground}
          bounds={bounds}
        />
        {this.renderLocationIcons()}
        {this.renderPlayer()}
      </LeafletMap>
    );
  }

  public renderLocationIcons() {
    return locations.map(locationData => <MapLocation id={locationData.id} icon={locationData.icon} key={locationData.id} x={locationData.x} y={locationData.y}/>)
  }

  public renderPlayer() {
    if (this.state.playerLocation) {
      return (<PlayerArrow user={this.props.user} x={this.state.playerLocation.x} y={this.state.playerLocation.y} fill="#af0606" />)
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
      default: return;
    }
  }

  private async fetchFactionMembers(): Promise<IFactionMemberPositionData[]> {
    const { data } = await backend.get('api/faction')
    return [...data];
  }
}

export default Map;
