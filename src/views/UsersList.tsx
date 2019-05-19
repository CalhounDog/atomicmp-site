import * as React from 'react';
import Container from "../components/Container";
import { auth } from '../utils/network';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import "../css/Table.css";
import IFaction from '../models/IFaction';

interface IUserInsecureData {
  discord_id: string;
  nickname: string;
  user_id: number;
  username: string;
  role: number;
  faction?: (IFaction);
  head: number;
  hair: number;
  hair_color: number;
  is_male: boolean;
  created_at: Date;
  last_seen: Date;
}
interface IRegisterState {
  loading: boolean;
  users: IUserInsecureData[];
  page: number;
  pageCount: number;
  searchQuery: string;
}

class UsersList extends React.Component <any, Partial<IRegisterState>> {
  public state: IRegisterState = {
    loading: true,
    users: [] as IUserInsecureData[],
    page: 1 as number,
    pageCount: 10 as number,
    searchQuery: "",
  }
  
  constructor(props: any) {
    super(props);
    this.lookupUsers = this.lookupUsers.bind(this);
    this.renderUsersTable = this.renderUsersTable.bind(this);
    this.noUsersFound = this.noUsersFound.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.handlePageCountChange = this.handlePageCountChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.filterUsersList = this.filterUsersList.bind(this);
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
          : this.state.users.filter(this.filterUsersList).length > 0
            ? this.usersFound()
            : this.noUsersFound()
        }
      </Container>
    )
  }

  public filterUsersList(user: IUserInsecureData) {
    return (
         user.username.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      || this.state.searchQuery === user.discord_id
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
    return Math.ceil(this.state.users.filter(this.filterUsersList).length / this.state.pageCount)
  }

  public renderUsersTable() {
    let usersList = this.state.users.filter(this.filterUsersList);

    if (this.state.pageCount) {
      usersList = usersList.slice((this.state.page - 1) * this.state.pageCount, (this.state.page) * this.state.pageCount)
    }

    return (
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>Faction</td>
          </tr>
        </thead>
        <tbody>

          {usersList
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
    const buttonStyle: React.CSSProperties = {
      backgroundColor: "var(--header-accent)",
      padding: "5px 17px",
      border: "2px solid white",
      color: "white",
    }
    return (
      <div style={{display: "flex", justifyContent: "flex-start"}}>
        <button style={buttonStyle} onClick={this.handlePrevPageClick}>◄</button>
        <button style={buttonStyle} onClick={this.handleNextPageClick}>►</button>
        {
          this.state.pageCount
            ? (<p style={{ margin: "0 10px" }}>Page {this.state.page}/{this.lastPage()}</p>)
            : (<p/>)
        }
        <label style={{ margin: "0 10px", fontSize: "20px" }}>
          Page Count:
          <select value={this.state.pageCount} onChange={this.handlePageCountChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
            <option value={0}>All</option>
          </select>
        </label>
        <label style={{ margin: "0 10px", fontSize: "20px" }}>
          Search:
          <input type="text" value={this.state.searchQuery} onChange={this.handleSearchChange}/>
        </label>
      </div>
    )
  }
  public noUsersFound() {
    return (
      <div>
        {this.renderControlBar()}
        <h1>Users not found!</h1>
        {this.renderControlBar()}
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
  public handlePageCountChange(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    this.setState({ pageCount: +event.target.value, page: 1})
  }
  public handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value, page: 1 })
  }
}

export default UsersList;
