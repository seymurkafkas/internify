import React from "react";
import styles from "./styles.module.css";
import { Button } from "@blueprintjs/core";

export default function ViewStudentContainer() {
  //   let item = props.item;
  const item = {
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
  };

  function ExperinceItem(props: any) {
    return (
      <div className={styles.experinceItem}>
        <p>
          <span>
            <b>{props.positionName}</b>
          </span>
          <span></span>
          <span>{props.companyName}</span>
          {/* <span>{props.startDate}</span> <span>{props.endDate}</span> */}
        </p>
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
      <div className={styles.educationItem}>
        <p>
          <span>{props.institutionName}</span> <span>{props.degreeName}</span>{" "}
          {/* <span>{props.startDate}</span> <span>{props.endDate}</span> */}
        </p>
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
          {item.skill}: {item.level}
        </div>
      );
    });
    return <>{list} </>;
  }

  function LanguageList(props: any) {
    const list = props.languages.map((item, index) => {
      return (
        <div key={index}>
          {item.language}: {item.level}
        </div>
      );
    });
    return <>{list} </>;
  }

  return (
    <div className={[styles.ViewStudentContainer, "flex", "flex-col"].join(" ")}>
      <div className={[styles.ViewStudentContainer, "flex", "justify-between"].join(" ")}>
        <div className="left">
          <h3>{item.name}</h3>
          <p>
            <span>at </span>
            <b>
              {item.location.city}, {item.location.country}
            </b>
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
          <div>{item.description}</div>
        </div>
        <div className="flex flex-row">
          <div>Experiences</div>
          <div>
            <ExperinceList exps={item.experience} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Education</div>
          <div>
            <EducationList education={item.education} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Interests</div>
          <div>{item.interests.join(", ")}</div>
        </div>
        <div className="flex flex-row">
          <div>Skills</div>
          <div>
            <SkillList skills={item.skills} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Languages</div>
          <div>
            <LanguageList languages={item.languages} />
          </div>
        </div>
      </div>
    </div>
  );
}
