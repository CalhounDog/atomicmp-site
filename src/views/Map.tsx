import * as React from "react";
import IUser from 'src/models/IUser';
import mapBackground from "../images/map.png";
import locations from "../utils/locations"

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
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

          {this.renderLocationIcons()}
        </div>

      </div>
    );
  }

  public renderLocationIcons() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%"
        viewBox="0 0 2048 2048"
        id="map-svg"
        >
        {locations.map(locationData => <MapLocation id={locationData.id} icon={locationData.icon} key={locationData.id} x={locationData.x} y={locationData.y}/>)}
      </svg>
    )
  }

  public handleKeyPress(event: KeyboardEvent) {
    switch(event.keyCode) {
      case(49): {
        this.setState({mode: "realistic"});
        break;
      }
      case(50): {
        this.setState({mode: "green"});
        break;
      }
      case(51): {
        this.setState({mode: "amber"});
        break;
      }
      case(52): {
        this.setState({mode: "blue"});
        break;
      }
      case(53): {
        this.setState({mode: "white"});
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
    return themes[this.state.mode]
  }

}

export default Map;
