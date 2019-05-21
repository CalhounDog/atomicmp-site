import React from "react";
import Container from "../components/Container";

interface IFAQ {
  shortcut: string;
  question: string;
  answer: string;
}

function FAQPage(props: any) {
  const faqs: IFAQ[] = [
    {
      shortcut: "whatis",
      question: "What is Atomic Multi Player?",
      answer: "AMP or FalloutMP is an unofficial standalone game set in the Fallout universe that's being built in Unreal Engine 4. It's 100% not for profit, and uses assets from Fallout 4 as well as other UE4 sources."
    },
    {
      shortcut: "status",
      question: "What is the status of development? Is there a release date?",
      answer: "There is no set release date, and it's in the alpha stage of development. The dev team is doing this as a hobby on our own time, so updates will be ready when they're ready."
    },
    {
      shortcut: "gameplay",
      question: "What will gameplay be like?",
      answer: "Gameplay will take a somewhat more realistic approach than it's predecessors. There is a heavy emphasis on the RPG and survival aspects of the Fallout universe, and so combat will be less common, but much more intense and rewarding than in previous games."
    },
    {
      shortcut: "setting",
      question: "What setting will it take place in?",
      answer: "The location will be set in Nevada, north of the Mojave wasteland. We are striving to bring New Reno to life in UE4, but much of the gameplay will also take place in the surrounding desert/mountains. The time period is tentatively set for the years just following the events of Fallout: New Vegas, but making the game a spiritual successor to Fallout 2 has also been discussed."
    },
    {
      shortcut: "pvp",
      question: "Will it focus on PVE or PVP?",
      answer: "Teamwork and cooperative gameplay will be heavily emphasized in the majority of time spent playing the game, however we're striving to make sure that PVP will be smooth and well balanced as well."
    },
    {
      shortcut: "quests",
      question: "Will there be quests? What type?",
      answer: "We want to create a wide variety of dynamic, narrative driven quests, ranging from small unnamed side quests to multi-phase missions involving all of the major factions in the wasteland. Smaller radiant quests will also be available, such as pest control, bounty hunting, looting pre-war ruins, etc."
    },
    {
      shortcut: "requirements",
      question: "What will be needed to play this game?",
      answer: "All you'll need is a PC that can run it(it's not too demanding for low-ish end hardware), and a copy of Fallout 4 since the game uses Fallout 4 assets."
    },
    {
      shortcut: "tester",
      question: "Can I be an alpha Tester?",
      answer: "Applying to be a Tester is easy! Simply fill out the <a target=\"_blank noreferrer noopener\" href='https://goo.gl/forms/U1ce3DizYli4SszK2'>application form</a>. These get evaluated every Friday."
    },
    {
      shortcut: "updates",
      question: "Whats going to be the next update? Will we see X? When will it drop?",
      answer: "Check #Announcements on Discord. Test builds will be released when they're ready to select members that are active in the community. Please don't DM the dev team or ask excessively in other channels."
    },
    {
      shortcut: "volunteering",
      question: "How can I help?",
      answer: "We aren't accepting monetary donations at this time, however we need all the developer help we can get. If you're familiar with developing for UE4, modding Fallout 4, creating assets such as clothing, NPCs, or weapons, animating, etc. we're love to have you on the team."
    },
    {
      shortcut: "mod",
      question: "Is this a mod for an existing game?",
      answer: "No. This is a stand-alone platform created with Unreal Engine 4."
    },
    {
      shortcut: "mod-support",
      question: "Will mods ever be supported?",
      answer: "We have no current plans to support custom content."
    },
    {
      shortcut: "installation",
      question: "How do I install AMP?",
      answer: "Go to the <a href=\"/download\">Download</a> page and install the latest version. It will be >2Gb, so plan accordingly. Run the executable in the root of the game files to start the game. Note that while anyone can download the game, you will need a <a href=\"#tester\">Tester</a> account to actually enter the game."
    },
    {
      shortcut: "assets",
      question: "Do I need to have Fallout 4 installed for AMP to work?",
      answer: "No, the game includes Fallout 4 assets that have been ported over to the Unreal Engine. <i>That said,</i> all Testers are required to have a legal copy of Fallout 4 on Steam."
    },
  ]

  return (
    <Container>
      <h1>FAQ</h1>
      {
        faqs.map((faq: IFAQ) => (
          <div key={faq.shortcut} id={faq.shortcut}>
            <p><strong>Q: </strong><i>"{faq.question}"</i>  <a href={"#" + faq.shortcut}><i className="fas fa-link"></i></a></p>
            <p><strong>A: </strong><span dangerouslySetInnerHTML={{__html: faq.answer}}></span></p>
            <hr/>
          </div>
        ))
      }
    </Container>
  )
}

export default FAQPage;
