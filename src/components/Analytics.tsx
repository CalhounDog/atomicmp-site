import React, { Component, } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize('UA-140821960-1');

class Analytics extends Component<RouteComponentProps<any>> {
  componentDidMount() {
    this.sendPageChange(this.props.location.pathname, this.props.location.search)
  }

  componentDidUpdate(prevProps: RouteComponentProps<any>) {
    if (this.props.location.pathname !== prevProps.location.pathname
      || this.props.location.search !== prevProps.location.search) {
      this.sendPageChange(this.props.location.pathname, this.props.location.search)
    }
  }

  sendPageChange(pathname: string, search: string = "") {
    const page = pathname + search
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }

  render() {
    return null
  }
}

const AnalyticsTracker = () => {
  return <Route component={Analytics} />
}

export default AnalyticsTracker;
