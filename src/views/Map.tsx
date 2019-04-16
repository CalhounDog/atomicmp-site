import * as React from "react";
import IUser from 'src/models/IUser';
import {
  blockade,
  cityRuins,
  clover,
  farm,
  junkCity,
  militaryCheckpoint,
  radioStation,
  railroadCrossing,
  redRocket,
  smallHouse,
  tentCity,
  town,
} from "../images/map-markers"
import mapBackground from "../images/map.png";

interface IMapLocationProps {
  id: string;
  icon: string;
  x: number;
  y: number;
}

interface IMapLocationState {
  hover: boolean;
}

class MapLocation extends React.Component<IMapLocationProps, Partial<IMapLocationState>> {
  public state = {
    hover: false
  }

  constructor(props: IMapLocationProps) {
    super(props);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
  }

  public render() {
    const iconDimension = 40;
    return (
      <g>
        <title>{this.props.id}</title>
        <image id={this.props.id}
        style={{
          WebkitFilter: "none",
          boxShadow: "1px 1px black",
          opacity: 1,
        }}
        stroke="#1aff80"
        strokeWidth="2"
        width={iconDimension + "px"}
        height={iconDimension + "px"}
        x={this.props.x - iconDimension / 2}
        y={this.props.y - iconDimension / 2}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        xlinkHref={this.props.icon}
      />
      </g>
    )
  }
  public handleOnMouseEnter() {
    this.setState({hover: true})
  }
  public handleOnMouseLeave() {
    this.setState({hover: false})
  }
}

interface IMapProps {
  user: IUser;
}

interface IMapState {
  mode: string
}

// tslint:disable: max-classes-per-file
class Map extends React.Component<IMapProps, IMapState> {
  public state = {
    mode: "default", 
  }
  constructor(props: IMapProps) {
    super(props);
    this.getMapStyle = this.getMapStyle.bind(this);
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

          {this.loadLocationIcons()}
        </div>

      </div>
    );
  }

  public loadLocationIcons() {
    const data = [
      {
        icon: clover,
        id: "Ways Bar",
        x: 1570,
        y: 1160,
      },
      {
        icon: militaryCheckpoint,
        id: "Military Checkpoint",
        x: 1163,
        y: 458,
      },
      {
        icon: smallHouse,
        id: "Diner",
        x: 1540,
        y: 655,
      },
      {
        icon: farm,
        id: "Tumbleweed Fields",
        x: 224,
        y: 1799,
      },
      {
        icon: smallHouse,
        id: "The Oasis Motel",
        x: 1620,
        y: 1145,
      },
      {
        icon: tentCity,
        id: "NCR Encampment",
        x: 542,
        y: 282,
      },
      {
        icon: railroadCrossing,
        id: "The Tracks",
        x: 505,
        y: 820,
      },
      {
        icon: radioStation,
        id: "Military Broadcast Station",
        x: 1890,
        y: 1450,
      },
      {
        icon: redRocket,
        id: "Red Rocket",
        x: 1370,
        y: 605,
      },
      {
        icon: blockade,
        id: "Raider Encampment",
        x: 1051,
        y: 487,
      },
      {
        icon: cityRuins,
        id: "Fireside Arena",
        x: 820,
        y: 1050,
      },
      {
        icon: farm,
        id: "Ramsey Ranch",
        x: 313,
        y: 505,
      },
      {
        icon: junkCity,
        id: "Spawn Town",
        x: 1720,
        y: 720,
      },
      {
        icon: farm,
        id: "Stables",
        x: 416,
        y: 1040,
      },
      {
        icon: town,
        id: "Tri-Rail",
        x: 420,
        y: 965,
      },

    ]
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%"
        viewBox="0 0 2048 2048"
        id="map-svg"
        >
        {data.map(locationData => <MapLocation id={locationData.id} icon={locationData.icon} key={locationData.id} x={locationData.x} y={locationData.y}/>)}
      </svg>
    )
  }

  private getMapStyle(): (string | undefined) {
    const themes = {
      amber:"#2ecfff",
      blue:"#ffb642",
      green:"#1aff80",
      white:"#c0ffff",
    }
    return themes[this.state.mode]
  }

}

export default Map;
