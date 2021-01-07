import React from "react";
import styles from "./styles.module.css";
import { Button } from "@blueprintjs/core";

export default function ViewStudentContainer() {
  //   let item = props.item;
  const item = {
    name: "Mert Buran",
    educationPrimary: "Istanbul Technical Universtiy",
    appliedFor: "Software Engineering",
    email: "mertburan@itu.edu.tr",
    address: "Fulya, Ortaklar Cd. 1/C, 03400 Mecidiyeköy - Şişli/İstanbul",
    experiences: [
      {
        title: "Software Developer",
        company: "SomeSoft Technologies",
        startDate: "12/2003",
        endDate: "06/2008",
        description:
          "Aenean sit amet nulla scelerisque, tempus lectus ut, congue augue. Morbi massa est, sagittis volutpat turpis eu, commodo interdum augue. Nullam eu",
      },
      {
        title: "Data Developer",
        company: "DataSoft Technologies",
        startDate: "12/2009",
        endDate: "06/20012",
        description: "Congue augue. Morbi massa est, sagittis volutpat turpis eu, commodo interdum augue. Nullam eu",
      },
    ],
    age: 32,
    education: [
      {
        name: "Istanbul Technical University",
        level: "University",
        grade: "3.99",
        startDate: "12/2009",
        endDate: "06/20012",
      },
      {
        name: "Kükürtlü İlköğretim Okulu",
        level: "Primary School",
        grade: "100.0",
        startDate: "12/2009",
        endDate: "06/20012",
      },
    ],
    interests: ["read", "write", "listen", "play"],
    skills: [
      {
        name: "Python",
        level: "advanced",
      },
      {
        name: "Go",
        level: "advanced",
      },
    ],
    languages: [
      {
        name: "English",
        level: "advanced",
      },
      {
        name: "Russian",
        level: "advanced",
      },
    ],
  };

  function ExperinceItem(props: any) {
    return (
      <div className={styles.experinceItem}>
        <p>
          <span>
            <b>{props.title}</b>
          </span>
          <span>{props.company}</span> <span>{props.startDate}</span> <span>{props.endDate}</span>
        </p>
        <p>{props.description}</p>
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
          <span>{props.name}</span> <span>{props.level}</span> <span>{props.grade} </span>{" "}
          <span>{props.startDate}</span> <span>{props.endDate}</span>
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
          {item.name}: {item.level}
        </div>
      );
    });
    return <>{list} </>;
  }

  function LanguageList(props: any) {
    const list = props.languages.map((item, index) => {
      return (
        <div key={index}>
          {item.name}: {item.level}
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
          <p>{item.educationPrimary}</p>
          <p>
            for <b>{item.appliedFor}</b>
          </p>
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
          <div>Age</div>
          <div>{item.age}</div>
        </div>
        <div className="flex flex-row">
          <div>Email</div>
          <div>{item.email}</div>
        </div>
        <div className="flex flex-row">
          <div>Address</div>
          <div>{item.address}</div>
        </div>
        <div className="flex flex-row">
          <div>Experiences</div>
          <div>
            <ExperinceList exps={item.experiences} />
          </div>
        </div>
        <div className="flex flex-row">
          <div>Experiences</div>
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
