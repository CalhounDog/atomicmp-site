import * as React from 'react';
import Container from "../components/Container";
import { auth } from '../utils/network';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import IFaction from '../models/IFaction';

interface ITargetUser {
  faction?: IFaction;
  id: number;
  username: string;
  role: number;
}

interface IRegisterState {
  targetUser?: ITargetUser;
  loading: boolean;
}

class User extends React.Component <any, Partial<IRegisterState>> {
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

    if (data.faction) {
      const faction = (await auth.get("/api/faction/"+data.faction)).data
      return {
        faction,
        username: data.username,
        role: data.role,
        id: data.user_id,
      }
    }

    return {
      username: data.username,
      role: data.role,
      id: data.user_id,
    }
  }

  public renderUserData() {
    return (
      <div>
        <h1>{this.state.targetUser.username}</h1>
        {this.state.targetUser.faction
          ? <p>Member of&nbsp;
            <Link to={"/faction/" + this.state.targetUser.faction.faction_id}>
                {this.state.targetUser.faction.faction_name}
              </Link>
            </p>
          : <p></p>
        }
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
