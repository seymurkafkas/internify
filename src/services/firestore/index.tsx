import "../firebase/init";
import firebase from "firebase";
import "firebase/firestore";
// import { DateRange } from "@blueprintjs/datetime";

const db = firebase.firestore();

interface StudentProfileData {
  name: string;
  location: { city: string; country: string };
  education: any;
  experience: any;
  description: string;
  skills: { skill: string; level: string }[];
  languages: { language: string; level: string }[];
  interests: string[];
}

export function saveStudentProfile(profileData: StudentProfileData, userId: string) {
  return async function () {
    try {
      await db.collection("Students").doc(userId).set(profileData, { merge: true });
    } catch (err) {
      console.log(err);
    }
    return;
  };
}

export async function getStudentProfile(userId: string) {
  try {
    const userDataResponse = await db.collection("Students").doc(userId).get();
    if (!userDataResponse.exists) {
      throw "Student Data doesnt exist";
    }
    return userDataResponse.data();
  } catch (err) {
    console.log(err);
  }
}

interface EmployerProfileData {}
export function saveEmployerProfile(profileData: EmployerProfileData, userId: string) {
  return async function () {
    try {
      await db.collection("Employers").doc(userId).set(profileData, { merge: true });
    } catch (err) {
      console.log(err);
    }
    return;
  };
}

export async function getEmployerProfile(userId: string) {
  try {
    const userDataResponse = await db.collection("Employers").doc(userId).get();
    if (!userDataResponse.exists) {
      throw "Employer Data doesnt exist";
    }
    return userDataResponse.data();
  } catch (err) {
    console.log(err);
  }
}

export async function getMyListings(userId: string) {
  try {
    const userDataResponse = await db.collection("Employers").doc(userId).collection("Listings").get();
    userDataResponse.forEach((doc) => {
      return {
        ...doc.data(),
        listingid: doc.id,
      };
    });
    return userDataResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function getApplicantsForListing(userId: string, listingId: string) {
  try {
    const dataResponse = await db.collection("Employers").doc(userId).collection("Listings").doc(listingId).get();
    if (!dataResponse.exists) {
      throw "Listing doesn't exist";
    }
    return dataResponse.data().applicants;
  } catch (err) {
    console.log(err);
  }
}
