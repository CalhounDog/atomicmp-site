import * as React from "react";

class Container extends React.Component{
  public render() {
    return (
      <div className="site-wrap">
        {this.props.children}
      </div>
    )
  }
}

export default Container;
