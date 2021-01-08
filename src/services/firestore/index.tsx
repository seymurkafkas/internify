import "../firebase/init";
import firebase from "firebase";
import "firebase/firestore";
import { DateRange } from "@blueprintjs/datetime";

const db = firebase.firestore();

interface StudentProfileData {
  name: string;
  location: { city: string; country: string };
  education: DateRange[];
  experience: DateRange[];
  description: string;
  skills: { skill: string; level: string }[];
  languages: { language: string; level: string }[];
  interests: string[];
}

export function saveStudentProfile(profileData: StudentProfileData, userId: string) {
  return async function () {
    try {
      await db.collection("Students").doc(userId).set(profileData);
    } catch (err) {
      console.log(err);
    }
    return;
  };
}

export async function getStudentProfile(userId: string) {
  const userData = await db.collection("Students").doc(userId).get();
  return userData;
}

interface EmployerProfileData {}
export function saveEmployerProfile(profileData: EmployerProfileData, userId: string) {
  return async function () {
    try {
      await db.collection("Employers").doc(userId).set(profileData);
    } catch (err) {
      console.log(err);
    }
    return;
  };
}

export async function getEmployerProfile(userId: string) {
  const userData = await db.collection("Employers").doc(userId).get();
  return userData;
}
