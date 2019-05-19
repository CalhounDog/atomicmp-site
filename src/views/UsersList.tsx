import * as React from 'react';
import Container from "../components/Container";
import { auth } from '../utils/network';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import IFaction from '../models/IFaction';

interface ITargetUser {
  faction?: IFaction;
  user_id: number;
  username: string;
  role: number;
}

interface IRegisterState {
  loading: boolean;
  users: ITargetUser[];
  page: number;
}

class UsersList extends React.Component <any, Partial<IRegisterState>> {
  public state: IRegisterState = {
    loading: true,
    users: [] as ITargetUser[],
    page: 1 as number,
  }

  private pageCount = 25;
  
  constructor(props: any) {
    super(props);
    this.lookupUsers = this.lookupUsers.bind(this);
    this.renderUsersTable = this.renderUsersTable.bind(this);
    this.noUsersFound = this.noUsersFound.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }
  
  public componentDidMount() {
    this.lookupUsers()
    .then(data => {
      this.setState(state => ({ ...state, loading: false, users: data }))
    })
    .catch(console.error)
  }
  public render() {
    return (
      <Container>
        {
          this.state.loading
          ? Spinner()
          : this.state.users
            ? this.usersFound()
            : this.noUsersFound()
        }
      </Container>
    )
  }

  public async lookupUsers() {
    const [factionsDataResponse, usersDataResponse] = await Promise.all([
      auth.get("/api/factions"),
      auth.get("/api/users")
    ])
    
    const usersData = usersDataResponse.data.users;
    const factionsData = factionsDataResponse.data.factions;

    const users = usersData.map((user: any) => ({
      ...user,
      faction: factionsData.find((x: any) => x.faction_id === user.faction)
    })).sort((a: any,b: any) => a.user_id - b.user_id)

    return users
  }

  private lastPage() {
    return Math.ceil(this.state.users.length / this.pageCount)
  }

  public renderUsersTable() {
    return (
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>Faction</td>
          </tr>
        </thead>
        <tbody>

          {this.state.users
            .slice((this.state.page - 1) * this.pageCount, (this.state.page) * this.pageCount)
            .map(user => (
              <tr key={user.user_id}>
                <td>
                  <Link to={"/user/"+user.user_id}>
                    {user.username}
                  </Link>
                </td>
                <td>
                  {
                    user.faction
                      ? <Link to={"/faction/" + user.faction.faction_id}>
                          <span style={{ color: user.faction.color }}>■ </span>
                          {user.faction.faction_name}
                        </Link>
                      : <div/>
                  }
                  
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
  public usersFound() {
    return (
      <div>
        {this.renderControlBar()}
        {this.renderUsersTable()}
        {this.renderControlBar()}
      </div>
    )
  }

  public renderControlBar() {
    const buttonStyle = { backgroundColor: "var(--header-accent)", padding: "5px 17px", borderColor: "white" }
    return (
      <div style={{display: "flex", justifyContent: "flex-start"}}>
          <button style={buttonStyle} onClick={this.handlePrevPageClick}>◄</button>
          <button style={buttonStyle} onClick={this.handleNextPageClick}>►</button>
        <p style={{margin:"0 10px"}}>Page {this.state.page}/{this.lastPage()}</p>
      </div>
    )
  }
  public noUsersFound() {
    return (
      <div>
        <h1>Users not found!</h1>
      </div>
    )
  }

  public handleNextPageClick() {
    const page = this.state.page < this.lastPage()
      ? this.state.page + 1
      : this.state.page
    this.setState({ page })
  }
  public handlePrevPageClick() {
    const page = this.state.page > 1 
      ? this.state.page - 1
      : 1
    this.setState({ page })
  }
}

export default UsersList;
