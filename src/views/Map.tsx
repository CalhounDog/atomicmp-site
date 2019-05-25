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
import IFaction from '../models/IFaction';

const STARTING_COORDS = {
  x: 69449.953125,
  y: -26285.0,
};

interface IUserPositionData {
  id: string;
  username: string;
  x: number;
  y: number;
  rotation: number;
  color: string;
}

interface IMapProps {
  user: IUser;
}

interface IMapState {
  playerLocation?: {
    x: number;
    y: number;
    rotation: number;
  },
  zoom: number;
  otherPlayersData: IUserPositionData[],
}

// tslint:disable: max-classes-per-file
class Map extends React.Component<IMapProps, IMapState> {
  public state = {
    otherPlayersData: [] as IUserPositionData[],
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
    this.renderPlayer = this.renderPlayer.bind(this);
    this.fetchOtherPlayersData = this.fetchOtherPlayersData.bind(this);
    this.pollMapData = this.pollMapData.bind(this);
  }

  public pollMapData() {
    this.fetchOtherPlayersData().then(({ users }) => {
      console.log(users)
      this.setState({ otherPlayersData: users })
    }).catch(console.error)
  };
  public pollMapDataTicker!: NodeJS.Timeout;

  public componentDidMount() {
    this.pollMapData();

    // Initialize map polling
    this.pollMapDataTicker = setInterval(this.pollMapData, 5000)
    this.setState(state => ({ ...state, playerLocation: {
      ...playerCoordsToImg(this.props.user),
      rotation: this.props.user.rotation
    }
    }))
  }
  public componentWillUnmount() {

    // Terminate API polling function
    clearInterval(this.pollMapDataTicker)
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
        {this.renderOtherPlayers()}
        
        {/* Player should have highest z-index; render last */}
        {this.state.playerLocation
          ? this.renderPlayer()
          : <div/>
        }
      </LeafletMap>
    );
  }

  public renderLocationIcons() {
    return locations.map(locationData => <MapLocation
      id={locationData.id}
      icon={locationData.icon}
      key={locationData.id}
      x={locationData.x}
      y={locationData.y} />)
  }

  public renderOtherPlayers() {
    return this.state.otherPlayersData.map(targetUser => <PlayerArrow
      key={targetUser.username}
      fill={targetUser.color}
      x={targetUser.x}
      y={targetUser.y}
      rotation={targetUser.rotation + 90}
      username={targetUser.username}
      />
    )
  }

  public renderPlayer() {
    return (<PlayerArrow
      username={this.props.user.username}
      x={this.state.playerLocation.x}
      y={this.state.playerLocation.y}
      rotation={this.state.playerLocation.rotation + 90}
      fill={"rgb(26,255,128)"}
      />)
  }

  private async fetchOtherPlayersData(): Promise<{ users: IUserPositionData[] }> {
    const [factionsDataResponse, usersDataResponse] = await Promise.all([
      auth.get("/api/factions"),
      auth.get("/api/map")
    ])

    const usersData = usersDataResponse.data.users;
    const factionsData = factionsDataResponse.data.factions;

    const users: any = usersData.map((user: IUser) => ({
      ...user,
      faction: factionsData.find((x: IFaction) => x.faction_id === user.faction) as IFaction
    }))

    return {
      users: users
        .filter((targetUser: IUser) => this.props.user.user_id !== targetUser.user_id && (targetUser.x_pos != null && targetUser.y_pos != null && targetUser.rotation != null))
        .map((user: any) => ({
          id: user.user_id,
          username: user.username,
          ...playerCoordsToImg({x_pos: user.x_pos, y_pos: user.y_pos}),
          rotation: user.rotation,
          color: (user.faction) ? user.faction.color : "#FFFFFF",
        }))
    }
  }
}

export default Map;
