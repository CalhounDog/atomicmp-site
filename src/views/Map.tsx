import * as React from "react";
import MapLocation from '../components/MapLocation';
import mapBackground from "../images/map.png";
import IUser from '../models/IUser';
import locations from "../utils/locations"

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
