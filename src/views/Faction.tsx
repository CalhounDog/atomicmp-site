import * as React from "react";
import Container from "../components/Container"
import { auth } from "../utils/network";

interface IFactionState {
  factionFound: boolean;
  loading: boolean;
  factionData?: {
    id?: number;
    name?: string;
    color?: string;
  }
}

class Faction extends React.Component<any, IFactionState> {
  public state = {
    loading: false,
    factionFound: false,
    factionData: {
      color: "",
      id: 0,
      name: ""
    }
  }

  constructor(props: any) {
    super(props);

    console.log(props)
    this.lookupTargetFaction = this.lookupTargetFaction.bind(this);
    this.state.factionData.id = props.match.params.factionId;

  }

  public componentDidMount() {
    const ctx = this;
    this.lookupTargetFaction(this.state.factionData.id).then(data => {
      ctx.setState(state => ({
        ...state,
        factionFound: true,
        factionData: data
      }));
    })
  }

  public render() {
    return (
      <div>
        <Container>
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
        <h1>Faction</h1>
        <h2>ID</h2>
        <p>{this.state.factionData.id}</p>
        <h2>Name</h2>
        <p>{this.state.factionData.name}</p>
        <h2>Color</h2>
        <p>{this.state.factionData.color}</p>
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

  public async lookupTargetFaction(factionId: number) {
    const { data } = await auth.get("/api/faction-lookup/" + factionId)
    return {
      color: data.color,
      name: data.faction_name,
      id: data.faction_id
    }
  }
}

export default Faction;
