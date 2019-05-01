import * as moment from "moment";
import * as React from "react";
import Container from "../components/Container"
import "../css/Table.css"

interface IBuildInfo {
  date: moment.Moment;
  link: string;
  version: string;
  changelog?: string[];
}

class Download extends React.Component {
  public buildsList: IBuildInfo[] = [
    {
      changelog: [
        "Bloatfly projectile now does damage", "Adjusted 10mm Fire rate (Buff)", "Adjusted .308 Fire rate (Buff)", "Fixed the need to click once before you can exit the Pipboy with 'Tab'", "Fixed guns appearing to float when switching between 1st and 3rd person quickly", "Fixed aiming being clunky in high latency situations", "Fixed Pipboy UI scroll bar not matching the custom colour", "Fixed 'X' button not being correctly coloured in the setting menu", "Fixed 'X' button not functioning", 
      ],
      date: moment("May 01, 2019"),
      link: "https://drive.google.com/file/d/1zrWlNRC44rflcVLZLnppqNpIjkEiVElt/view?usp=sharing",
      version: "0.3.6",
    },
    {
      changelog: [
        "Performance changes to lighting and town, Fixed Jukebox.",
      ],
      date: moment("April 28, 2019"),
      link: "https://drive.google.com/file/d/1m3xKr7IgnqS6vFQ73izW6yQcNz-IzIt-/view?usp=sharing",
      version: "0.3.5",
    },
    {
      changelog: [
        "AI navigation and damage fixed for radscorpions, geckos, bighorners, raiders.",
        "Changes to Lighting for map and tunnel.",
        "Changes to gun sounds.",
      ],
      date: moment("April 27, 2019"),
      link: "http://www.mediafire.com/file/3319e8f5kzj8jm4/AMP.rar/file",
      version: "0.3.4",
    },
    {
      changelog: [
        "Tweaked the lighting in the Character Customizer"
      ],
      date: moment("April 22, 2019"),
      link: "https://drive.google.com/file/d/1m3xKr7IgnqS6vFQ73izW6yQcNz-IzIt-/view?usp=sharing",
      version: "0.3.3"
    },
    {
      changelog: ["Fixed Appearance-Set authentication related bug"],
      date: moment("April 21, 2019"),
      link: "https://drive.google.com/file/d/1BjD1VFWHafLxqbvAUElnxaq7fFwGsg6B/view?usp=sharing",
      version: "0.3.2",
    },
    {
      changelog: [
        "Increased melee hit range",
        "Added in death and respawn system",
        "Shouldn't have a random floating sphere at default spawn now."
      ],
      date: moment("December 31, 2018"),
      link: "https://www.dropbox.com/s/7aqbge270eah79i/WindowsNoEditor.rar?dl=0",
      version: "0.3.0",
    },
    {
      changelog: [
        "Re-created hunger and thirst",
        "Attempted a fix for AP breaking for multiple players.",
        "Rebuilt unarmed combat",
        "Added blood visual and sound effects to punch",
        "Added switch between 1st and 3rd person",
      ],
      date: moment("December 30, 2018"),
      link: "https://www.dropbox.com/s/m66j1mw62bqgqer/WindowsNoEditor.rar?dl=0",
      version: "0.2.1",
    },
    {
      changelog: [
        "Fully implemented Server-side saving"
      ],
      date: moment("December 27, 2018"),
      link: "https://www.dropbox.com/s/62dxo920hyotdc8/WindowsNoEditor.zip?dl=0",
      version: "0.2.0",
    },
    {
      changelog: [
        "Created RPG speech system"
      ],
      date: moment("December 22, 2018"),
      link: "https://www.dropbox.com/s/h7rghct0yohb091/WindowsNoEditor.zip?dl=0",
      version: "0.1.4",
    },
    {
      date: moment("December 21, 2018"),
      link: "https://www.dropbox.com/s/ipyl8mo6wrjgswp/WindowsNoEditor.zip?dl=0",
      version: "0.1.3",
    },
    {
      changelog: [
        "Experimented with Server-side saving"
      ],
      date: moment("September 11, 2018"),
      link: "https://www.dropbox.com/s/ozn48nurzd65hc2/WindowsNoEditor.zip?dl=0",
      version: "0.1.2",
    },
    {
      changelog: [
        "Implemented character customization"
      ],
      date: moment("September 9, 2018"),
      link: "https://www.dropbox.com/s/jdhkdzz1pt89gps/AMP-09-09-18.zip?dl=0",
      version: "0.1.1",
    },
    {
      date: moment("August 25, 2018"),
      link: "https://www.dropbox.com/s/d38336bouy9efoi/AMPBuild_29-07-18.zip?dl=0",
      version: "0.1.0",
    },
  ].sort((a,b) => b.date.unix() - a.date.unix())

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
          {this.buildsList.map((info, i) => {
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
    const info = this.buildsList[0];
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
