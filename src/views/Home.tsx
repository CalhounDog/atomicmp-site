import * as React from "react";
import Container from "../components/Container"
import Header from "../components/Header"
import banner from "../images/amp-splash-logo-shadowed.png"
import arena from "../images/arena_low.png"

class Home extends React.Component {
  public render() {
    return (
      <div>
        <Header active="home" />
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <img
            src={banner}
          />
        </div>
        <Container>
          <h1>Atomic Multiplayer</h1>
          <p>AtomicMP is the lovechild of the modern game engine Unreal Engine 4 and the kind of roleplay & world building that made you fall in love with gaming in the first place. If all goes well, this project will be the best of both worlds: Beautiful gameplay and meaningful story.
          </p>
          <img src={arena} style={{"width":"100%"}} />
          <p>If you want to keep tabs on development updates and be the first to hear about build launches, join our <a className="discord-icon" href="https://discord.gg/5kPpTKw" target="_blank">Discord <i className="fab fa-discord"/></a>. From there, you can also get in touch with staff members and apply to become a Tester.</p>
        </Container>
        <div id="background"/>
      </div>
    );
  }
}

export default Home;
