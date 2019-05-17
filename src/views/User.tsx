import * as React from 'react';
import Container from "../components/Container";
import { auth } from '../utils/network';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import IFaction from '../models/IFaction';
import moment, { Moment } from 'moment';

interface ITargetUser {
  faction?: IFaction;
  id: number;
  username: string;
  role: number;
  created_at: Moment;
  last_seen: Moment;
}

interface IUserState {
  targetUser?: ITargetUser;
  loading: boolean;
}

class User extends React.Component <any, Partial<IUserState>> {
  public state = {
    loading: true,
    targetUser: {} as ITargetUser,
  }
  
  constructor(props: any) {
    super(props);
    this.lookupTargetUser = this.lookupTargetUser.bind(this);
    this.renderUserData = this.renderUserData.bind(this);
    this.userNotFound = this.userNotFound.bind(this);
    this.state.targetUser.id = props.match.params.targetUserId;
  }
  
  public componentDidMount() {
    this.lookupTargetUser(this.state.targetUser.id)
    .then(data => {
      this.setState(state => ({ ...state, loading: false, targetUser: data }))
    })
    .catch(console.error)
  }
  public render() {
    return (
      <Container>
        {
          this.state.loading
          ? Spinner()
          : this.state.targetUser
            ? this.renderUserData()
            : this.userNotFound()
        }
      </Container>
    )
  }

  public async lookupTargetUser(userId: number) {
    const { data } = await auth.get("/api/user/"+userId)
    let faction;
    if (data.faction) {
      faction = (await auth.get("/api/faction/"+data.faction)).data
    }

    return {
      ...data,
      last_seen: moment(data.last_seen),
      created_at: moment(data.created_at),
      faction,
    }
  }

  public renderUserData() {
    return (
      <div>
        <Link to="/users">◄ All Users</Link>
        <h1>{this.state.targetUser.username}</h1>
        {this.state.targetUser.faction
          ? <p>Member of&nbsp;
            <Link to={"/faction/" + this.state.targetUser.faction.faction_id}>
                {this.state.targetUser.faction.faction_name}
              </Link>
            </p>
          : <p></p>
        }
        <p>Joined: {this.state.targetUser.created_at.fromNow()}</p>
        <p>Last Seen: {this.state.targetUser.last_seen.fromNow()}</p>
      </div>
    )
  }
  public userNotFound() {
    return (
      <div>
        <h1>User not found!</h1>
      </div>
    )
  }
}

export default User;
