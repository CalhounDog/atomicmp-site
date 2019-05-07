import * as React from "react";
import Container from "../components/Container"
import "../css/Table.css";

import { changelog } from "../utils/constants";

class Download extends React.Component {

  public render() {
    return (
      <Container>
        <h2>Latest Build</h2>
        {this.renderLatestBuildSection()}
        <h2>Previous Builds</h2>
        {this.renderLegacyBuildsTable()}
      </Container>
    )
  }

  private renderLegacyBuildsTable() {
    return (
      <table>
        <thead>
          <tr>
            <td>Build Date</td>
            <td>Version</td>
            <td style={{paddingLeft: "45px"}}>Changelog</td>
          </tr>
        </thead>
        <tbody>
          {changelog.map((info, i) => {
            return (
              <tr key={i}>
                <td>{info.date.format("MMMM Do YYYY")}</td>
                <td><a target="_blank" href={info.link} style={{textDecoration: "underline"}}>{info.version}</a></td>
                <td>{info.changelog ? this.renderChangelogList(info.changelog) : undefined}</td>
              </tr>
            )
          })}

        </tbody>
      </table>
    )
  }

  private renderChangelogList(changelog: string[]) {
    return (
      <ul style={{marginLeft: "40px", padding: "20px 0"}}>
        {changelog.map((change, i) => <li key={i}>{change}</li>)}
      </ul>
    )
  }
  
  private renderLatestBuildSection() {
    const info = changelog[0];
    return (
      <div>
        <h3>Build {info.version} - {info.date.format("MMMM Do YYYY")}</h3>
        <a target="_blank" href={info.link}><span style={{backgroundColor: "var(--header-accent", color: "white", borderRadius: "5px", padding: "10px", margin: "15px 0", display: "inline-flex"}}>Download</span></a>
        {info.changelog
          ? (<div>
              <h3>Changes</h3>
              {this.renderChangelogList(info.changelog)}
            </div>)
          : undefined
        }
      </div>
    )
  }
}

export default Download;
