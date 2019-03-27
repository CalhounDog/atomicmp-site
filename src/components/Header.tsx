import * as React from "react";
import { Link } from "react-router-dom";
import '../css/Header.css'
import logo from "../images/amp-header-logo-low.png"

// tslint:disable-next-line: no-empty-interface
interface INavProps {}

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
        <Link className="nav-logo" to="/">
          <img src={logo} style={{ width: "300px", height: "58px" }} />
        </Link>
        <Link
          className="nav-item discord-icon"
          to="https://discord.gg/5kPpTKw"
          target="_blank"
        >
          <span>Discord </span>
          <i className="fab fa-discord" />
        </Link>
        <Link className="nav-item" to="/register">
          Register
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
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
