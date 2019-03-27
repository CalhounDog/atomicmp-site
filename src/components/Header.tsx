import * as React from "react";
import '../css/Header.css'
import logo from "../images/amp-header-logo-low.png"

interface INavProps {
  active: string;
}

interface INavState {
  showResponsiveMenu: boolean;
}

class Header extends React.Component<INavProps,Partial<INavState>> {
  public state = {
    showResponsiveMenu: false
  }
  
  constructor(props: any) {
    super(props);
    this.state = { showResponsiveMenu: false };
    this.flipResponsiveMenu = this.flipResponsiveMenu.bind(this);
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
          <span>Discord </span>
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
          onClick={this.flipResponsiveMenu}
        >
          &#9776;
        </span>
      </nav>
    );
  }

  private flipResponsiveMenu() {
    this.setState({showResponsiveMenu: !this.state.showResponsiveMenu})
  }
}

export default Header;
