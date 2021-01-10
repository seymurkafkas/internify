import React from "react";
import styles from "./styles.module.css";
import { Button } from "@blueprintjs/core";
import * as DatabaseService from "../services/firestore";
import { stringifyDate } from "../util/date";

function ExperinceItem(props: any) {
  return (
    <div className={styles.experinceItem}>
      <div>
        <div>
          <span>
            <b>{props.positionName}</b>
          </span>
          <span> at </span>
          <span>{props.companyName}</span>
        </div>
        <div>
          <span>{stringifyDate(props.range[0]?.toDate() ?? null)}</span>
          <span> / </span>
          <span>{stringifyDate(props.range[1]?.toDate() ?? null)}</span>
        </div>
      </div>
      {/* <p>{props.description}</p> */}
    </div>
  );
}

function ExperinceList(props: any) {
  const list = props.exps.map((item, index) => {
    return <ExperinceItem key={index} {...item} />;
  });
  return <>{list} </>;
}

function EducationItem(props: any) {
  return (
    <div className={styles.education}>
      <div>
        <div>
          <span>
            <b>{props.degreeName}</b>
          </span>
          <span> at </span>
          <span>{props.institutionName}</span>
        </div>
        <div>
          <span>{stringifyDate(props.range[0]?.toDate() ?? null)}</span>
          <span> / </span>
          <span>{stringifyDate(props.range[1]?.toDate() ?? null)}</span>
        </div>
      </div>
      {/* <p>{props.description}</p> */}
    </div>
  );
}

function EducationList(props: any) {
  const list = props.education.map((item, index) => {
    return <EducationItem key={index} {...item} />;
  });
  return <>{list} </>;
}

function SkillList(props: any) {
  const list = props.skills.map((item, index) => {
    return (
      <div key={index}>
        {item.skill}: {["Beginner", "Intermediate", "Advanced"][item.level - 1]}
      </div>
    );
  });
  return <>{list} </>;
}

function LanguageList(props: any) {
  const list = props.languages.map((item, index) => {
    return (
      <div key={index}>
        {item.language}: {["Beginner", "Elementary", "Intermediate", "Proficient", "Native"][item.level - 1]}
      </div>
    );
  });
  return <>{list} </>;
}
export default function ViewStudentContainer(props: { applicantUid: string }) {
  const [applicantData, setApplicantData] = React.useState({
    name: "",
    description: "",
    location: {
      country: "",
      city: "",
    },
    experience: [],
    education: [],
    interests: [],
    skills: [],
    languages: [],
  });

  const [loadingData, setLoadingData] = React.useState(true);

  const applicantUid = props.applicantUid;
  /*   const item = {
    name: "Mert Buran",
    description:
      "Aenean sit amet nulla scelerisque, tempus lectus ut, congue augue. Morbi massa est, sagittis volutpat turpis eu, commodo interdum augue. Nullam eu",
    location: {
      country: "Turkey",
      city: "Istanbul",
    },
    experience: [
      {
        positionName: "Software Developer",
        companyName: "SomeSoft Technologies",
      },
    ],
    education: [
      {
        institutionName: "Istanbul Technical University",
        degreeName: "University",
        grade: "3.99",
      },
    ],
    interests: ["read", "write", "listen", "play"],
    skills: [
      {
        skill: "Python",
        level: "advanced",
      },
      {
        skill: "Go",
        level: "advanced",
      },
    ],
    languages: [
      {
        language: "English",
        level: "advanced",
      },
      {
        language: "Russian",
        level: "advanced",
      },
    ],
  }; */

  React.useEffect(() => {
    (async function () {
      try {
        const fetchedApplicantData = await DatabaseService.getStudentProfile(applicantUid);
        if (fetchedApplicantData) {
          setApplicantData(fetchedApplicantData);
        }
        setLoadingData(false);
      } catch (err) {
        console.log(err);
      }
    })();
  });

  let locationString = "Undeclared";
  if (applicantData.location.city && applicantData.location.country) {
    locationString = `${applicantData.location.city}, ${applicantData.location.country}`;
  } else {
    locationString = `${applicantData.location?.city ?? ""}${applicantData.location?.country ?? ""}`;
  }

  if (loadingData) {
    return <div>loading</div>;
  }

  return (
    <div className={[styles.ViewStudentContainer, "flex", "flex-col"].join(" ")}>
      <div className={[styles.ViewStudentContainer, "flex", "justify-between"].join(" ")}>
        <div className="left">
          <h3>{applicantData.name}</h3>
          <p>
            <span>from </span>
            <b>{locationString}</b>
          </p>
          <br />
        </div>
        <div className={["flex", "justify-between", "flex-col"].join(" ")}>
          <Button className={["bp3-outlined", styles.btnPill].join(" ")}>Approve</Button>
          <Button className={["bp3-outlined", styles.btnPill].join(" ")}>Reject</Button>
        </div>
      </div>
      <div className={styles.mt32}>
        <Button className={["bp3-outlined", styles.btnPill].join(" ")}>View CV</Button>
      </div>

      <div className={styles.informationTable}>
        <div className="flex flex-row">
          <div>Description</div>
          <div>{applicantData.description}</div>
        </div>
        <div className="flex flex-row">
          <div>Experiences</div>
          <div>
            <ExperinceList exps={applicantData.experience} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Education</div>
          <div>
            <EducationList education={applicantData.education} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Interests</div>
          <div>{applicantData.interests.join(", ")}</div>
        </div>
        <div className="flex flex-row">
          <div>Skills</div>
          <div>
            <SkillList skills={applicantData.skills} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Languages</div>
          <div>
            <LanguageList languages={applicantData.languages} />
          </div>
        </div>
      </div>
    </div>
  );
}
