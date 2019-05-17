import * as React from "react";
import Container from "../components/Container"
import { auth } from "../utils/network";
import IFaction from "../models/IFaction";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

interface IFactionState {
  loading: boolean;
  factionData?: IFaction;
}

class Faction extends React.Component<any, IFactionState> {
  public state = {
    loading: true,
    factionData: {} as IFaction
  }

  constructor(props: any) {
    super(props);
    this.lookupTargetFaction = this.lookupTargetFaction.bind(this);
    this.state.factionData.faction_id = props.match.params.factionId;
  }

  public componentDidMount() {
    const ctx = this;
    this.lookupTargetFaction(this.state.factionData.faction_id).then(data => {
      ctx.setState(state => ({
        ...state,
        loading: false,
        factionData: data
      }));
    })
  }

  public render() {
    return (
      <div>
        <Container>
          {
            this.state.loading
              ? Spinner()
              : this.state.factionData
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
        <Link to="/factions">◄ All Factions</Link>
        <h1 style={{color: this.state.factionData.color}}>
          {this.state.factionData.faction_name}
        </h1>
        <h2>Members</h2>
        <ul style={{ marginLeft: "30px" }}>
        {
          this.state.factionData.users.map((user: any) => {
            return (
              <li key={"user"+user.user_id}>
                <Link to={"/user/" + user.user_id}>
                  {user.username}
                </Link>
              </li>
            )
          })
        }
        </ul>
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
    const { data } = await auth.get("/api/faction/" + factionId)
    return {
      color: data.color,
      faction_name: data.faction_name,
      faction_id: data.faction_id,
      users: data.users,
    }
  }
}

export default Faction;
