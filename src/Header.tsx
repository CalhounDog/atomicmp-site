import * as React from "react";
import logo from "./images/amp-header-logo-low.png"

// tslint:disable: no-console
// tslint:disable-next-line: no-empty-interface
interface INavProps {}

interface INavState {
  showResponsiveMenu: boolean;
}

class App extends React.Component<INavProps,Partial<INavState>> {
  constructor(props: any) {
    super(props);
    this.state = { showResponsiveMenu: false };
    // this.flipResponsiveMenu = this.flipResponsiveMenu.bind(this);
    console.log(this.state)
  }

  public render() {
    return (
      <nav
        className={this.state.showResponsiveMenu? "topnav responsive": "topnav"}
        id="topnav"
      >
        <a className="nav-logo" href="/">
          <img src={logo} style={{ width: "300px", height: "58px" }} />
        </a>
        <a
          className="nav-item discord-icon"
          href="https://discord.gg/5kPpTKw"
          target="_blank"
        >
          <span>Discord</span>
          <i className="fab fa-discord" />
        </a>
        <a className="nav-item" href="/register">
          Register
        </a>
        <a className="nav-item" href="/login">
          Login
        </a>
        <span
          className="nav-item icon"
          // tslint:disable-next-line: jsx-no-lambda
          onClick={() => this.flipResponsiveMenu}
        >
          &#9776;
        </span>
      </nav>
    );
  }

  private flipResponsiveMenu() {
    console.log(this.state)
    this.setState({showResponsiveMenu: !this.state.showResponsiveMenu})
  }
}

export default App;
