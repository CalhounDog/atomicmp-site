import * as React from "react";
import Container from "../components/Container"
import { auth } from "../utils/network";
import IFaction from "../models/IFaction";
import { Link } from "react-router-dom";

interface IFactionState {
  factionFound: boolean;
  loading: boolean;
  factionData?: IFaction;
}

class Faction extends React.Component<any, IFactionState> {
  public state = {
    loading: false,
    factionFound: false,
    factionData: {
      color: "",
      id: 0,
      name: "",
      users: [] as any[]
    }
  }

  constructor(props: any) {
    super(props);
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
        <h1 style={{color: this.state.factionData.color}}>
          {this.state.factionData.name}
        </h1>
        <h2>Members</h2>
        {
          this.state.factionData.users.map((user: any) => {
            return (
              <p key={"user"+user.user_id}>
                <Link to={"/user/" + user.user_id}>
                  {user.username}
                </Link>
              </p>
            )
          })
        }
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
      name: data.faction_name,
      id: data.faction_id,
      users: data.users,
    }
  }
}

export default Faction;
