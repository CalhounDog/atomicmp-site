import { CRS, LatLngBounds } from 'leaflet';
import * as React from "react";
import {
  ImageOverlay,
  Map as LeafletMap,
} from "react-leaflet";
import backend from 'src/utils/network';
import MapLocation from '../components/MapLocation';
import PlayerArrow from "../components/MapPlayer";
import "../css/Map.css";
import mapBackground from "../images/map.png";
import IUser from '../models/IUser';
import { playerCoordsToImg } from '../utils/helpers';
import locations from "../utils/locations";

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
    maxZoom: 4,
    minZoom: -2,
    playerLocation: STARTING_COORDS,
    zoom: -1,
  }
  constructor(props: IMapProps) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.fetchFactionMembers = this.fetchFactionMembers.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

    const w = 2048;
    const h = 2048;

    const southWest: [number, number] = [0, h];
    const northEast: [number, number] = [w, 0];
    const bounds = new LatLngBounds(southWest, northEast);
    const position: [number, number] = [this.state.playerLocation.x, this.state.playerLocation.y];
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
        onClick={this.handleClick}
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
      return (<PlayerArrow x={this.state.playerLocation.x} y={this.state.playerLocation.y} fill="#af0606" />)
    } 
    return;
  }

  public handleClick(event: any) {
    console.log(event)
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
