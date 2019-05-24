import React, { Component, } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import ReactGA from "react-ga";
import IUser from "../models/IUser";

interface AnalyticsProps extends RouteComponentProps {
  user?: IUser;
}

class Analytics extends Component<AnalyticsProps> {
  componentDidMount() {
    ReactGA.initialize([{
      trackingId: "UA-140821960-1",
      gaOptions: {
        userId: (this.props.user || {} as IUser).user_id + "",
      }
    }]);
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
