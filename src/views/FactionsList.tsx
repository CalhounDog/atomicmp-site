import * as React from "react";
import Container from "../components/Container"
import { auth } from "../utils/network";
import IFaction from "../models/IFaction";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

interface IFactionsListState {
  loading: boolean;
  factions?: Partial<IFaction[]>;
}

class FactionsList extends React.Component<any, IFactionsListState> {
  public state = {
    loading: true,
    factions: [] as IFaction[]
  }

  constructor(props: any) {
    super(props);
    this.lookupFactions = this.lookupFactions.bind(this);
  }

  public componentDidMount() {
    const ctx = this;
    this.lookupFactions().then(data => {
      ctx.setState(state => ({
        ...state,
        loading: false,
        factions: data
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
            : this.state.factions
              ? this.renderFactionsList()
              : this.factionNotFound()
          }
        </Container>
      </div>
    );
  }

  public renderFactionsList() {
    return (
      <div>
        <h1>Factions</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {this.state.factions.map(faction => {
              return (
                <tr key={`faction${faction.id}`}>
                  <td>
                    <Link to={"/faction/" + faction.id}>
                      <span style={{color: faction.color}}>■ </span>
                      {faction.name}
                    </Link>
                  </td>
                  <td>{faction.color}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
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

  public async lookupFactions() {
    const { data } = await auth.get("/api/factions")
    return data.factions.map((faction: any) => ({
      color: faction.color,
      name: faction.faction_name,
      id: faction.faction_id,
    }))
  }
}

export default FactionsList;
