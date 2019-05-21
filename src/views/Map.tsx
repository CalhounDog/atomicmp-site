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
import locations from "../utils/constants/locations";
import { auth } from '../utils/network';
import MapFactionMember from '../components/MapFactionMember';

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
    rotation: number;
  },
  zoom: number;
  factionMembersData: IFactionMemberPositionData[]
}

// tslint:disable: max-classes-per-file
class Map extends React.Component<IMapProps, IMapState> {
  public state = {
    factionMembersData: [] as IFactionMemberPositionData[],
    mapTheme: "map-theme-realistic",
    maxZoom: 3,
    minZoom: -1,
    playerLocation: {
      ...STARTING_COORDS,
      rotation: 0,
    },
    zoom: 1,
  }
  constructor(props: IMapProps) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.fetchFactionMembers = this.fetchFactionMembers.bind(this);
  }

  public pollFactionData!: NodeJS.Timeout;

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    this.fetchFactionMembers().then(factionMembersData => {
      this.setState({ factionMembersData })
    }).catch(console.error)
    const ctx = this;
    this.pollFactionData = setInterval(function () {
      ctx.fetchFactionMembers().then(factionMembersData => {
        ctx.setState({ factionMembersData })
      }).catch(console.error)
    }, 5000)
    this.setState(state => ({ ...state, playerLocation: {
      ...playerCoordsToImg(this.props.user),
      rotation: this.props.user.rotation
    }
    }))
  }
  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    clearInterval(this.pollFactionData)
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
        {this.renderFactionMembers()}
        {this.renderPlayer()}
      </LeafletMap>
    );
  }
  public renderFactionMembers() {
    return this.state.factionMembersData.map(factionMember => <MapFactionMember key={factionMember.username} x={factionMember.x_pos} y={factionMember.y_pos} rotation={factionMember.rotation} username={factionMember.username}/>)
  }

  public renderLocationIcons() {
    return locations.map(locationData => <MapLocation id={locationData.id} icon={locationData.icon} key={locationData.id} x={locationData.x} y={locationData.y}/>)
  }

  public renderPlayer() {
    if (this.state.playerLocation) {
      return (<PlayerArrow user={this.props.user} x={this.state.playerLocation.x} y={this.state.playerLocation.y} rotation={this.state.playerLocation.rotation} fill="#af0606" />)
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
    const { data } = await auth.get('/api/faction/'+this.props.user.faction);
    return data.users.filter((user: IUser) => this.props.user.user_id !== user.user_id && (user.x_pos !== null && user.y_pos !== null && user.z_pos !== null));
  }
}

export default Map;
