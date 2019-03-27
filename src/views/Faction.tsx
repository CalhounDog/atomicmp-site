import * as React from "react";
import Container from "../components/Container"

interface IFactionState {
  factionFound: boolean;
  id?: number;
  name?: string;
  color?: string;
}

class Faction extends React.Component {
  public state: IFactionState;

  constructor(props: any) {
    super(props);

    // TODO: faction lookup here
    this.state = {
      color: "#333333",
      factionFound: true,
      id: 0,
      name: "testy"
    };
  }

  public render() {
    return (
      <div>
        <Container>
          <h1>Faction</h1>
          {this.state.factionFound
            ? this.renderFactionData()
            : this.factionNotFound()
          }
        </Container>
      </div>
    );
  }

  public renderFactionData() {
    return (
      <div>
        <h2>ID</h2>
        <p>{this.state.id}</p>
        <h2>Name</h2>
        <p>{this.state.name}</p>
        <h2>Color</h2>
        <p>{this.state.color}</p>
      </div>
    )
  }
  public factionNotFound() {
    return (
      <div>
        <h1>Faction not found</h1>
      </div>
    )
  }
}

export default Faction;
