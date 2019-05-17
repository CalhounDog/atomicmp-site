import * as React from 'react';
import Container from "../components/Container";
import backend from '../utils/network';

interface ITargetUser {
  faction: string;
  id: string;
  username: string;
  role: string;
}

interface IRegisterState {
  targetUser?: ITargetUser;
  loading: boolean;
}

class User extends React.Component <any, Partial<IRegisterState>> {
  public state = {
    loading: false,
    targetUser: {} as ITargetUser,
  }
  
  constructor(props: any) {
    super(props);
    this.lookupTargetUser = this.lookupTargetUser.bind(this)
  }
  
  public componentDidMount() {
    // this.lookupTargetUser(this.props)
  }
  public render() {
    if (this.state.loading) {
      return (
        <Container>
          <h2>Loading</h2>
        </Container>
      )
    } else {
      if (this.state.targetUser.username === "") {
        return (
          <Container>
            <h2>User data not found</h2>
          </Container>
        )
      } else {
        return (
          <Container>
            <h2>{this.state.targetUser.username}</h2>
          </Container>
        )
      }
    }
  }

  public async lookupTargetUser(userId: string) {
    try {
      const { data } = await backend.get("/user/"+userId)

      this.setState(state => ({...state, targetUser: data}))
    } catch(error) {
      console.error(error)
    }
  }
}

export default User;
