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
    const resultArr = [];
    userDataResponse.forEach((doc) => {
      resultArr.push({
        ...doc.data(),
        listingId: doc.id,
      });
    });
    return resultArr;
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

export async function getListingData(userId: string, listingId: string) {
  try {
    const dataResponse = await db.collection("Employers").doc(userId).collection("Listings").doc(listingId).get();
    if (!dataResponse.exists) {
      throw "Listing doesn't exist";
    }
    return dataResponse.data();
  } catch (err) {
    console.log(err);
  }
}

export async function createAListing(listingData: any, userId: string) {
  try {
    await db
      .collection("Employers")
      .doc(userId)
      .collection("Listings")
      .doc()
      .set({
        ...listingData,
        applicationCount: 0,
        applicants: [],
      });
    return;
  } catch (err) {
    console.log(err);
  }
}

export async function updateListing(listingData: any, userId: string, listingId: string) {
  try {
    await db
      .collection("Employers")
      .doc(userId)
      .collection("Listings")
      .doc(listingId)
      .update({
        ...listingData,
      });
    return;
  } catch (err) {
    console.log(err);
  }
}

export async function applyForListing(listingId: string, employerUid: string, studentUid: string) {
  try {
    await db
      .collection("Employers")
      .doc(employerUid)
      .collection("Listings")
      .doc(listingId)
      .update({
        applicants: firebase.firestore.FieldValue.arrayUnion(studentUid),
        applicantCount: firebase.firestore.FieldValue.increment(1),
      });

    await db
      .collection("Students")
      .doc(studentUid)
      .update({
        myApplications: firebase.firestore.FieldValue.arrayUnion({ employerUid, listingId }),
      });
    return;
  } catch (err) {
    console.log(err);
  }
}

export async function withdrawApplication(listingId: string, employerUid: string, studentUid: string) {
  try {
    await db
      .collection("Employers")
      .doc(employerUid)
      .collection("Listings")
      .doc(listingId)
      .update({
        applicants: firebase.firestore.FieldValue.arrayRemove(studentUid),
        applicantCount: firebase.firestore.FieldValue.increment(-1),
      });

    await db
      .collection("Students")
      .doc(studentUid)
      .update({
        myApplications: firebase.firestore.FieldValue.arrayRemove({ employerUid, listingId }),
      });
    return;
  } catch (err) {
    console.log(err);
  }
}

export async function isStudentAnApplicant(listingId: string, employerUid: string, studentUid: string) {
  try {
    const response = await db.collection("Students").doc(studentUid).get();
    if (response.exists) {
      const data = response.data();
      if (data?.myApplications ?? null) {
        for (let i = 0; i < data.myApplications.length; i++) {
          if (data.myApplications[i].listingId === listingId && data.myApplications[i].employerUid === employerUid) {
            return true;
          }
        }
      }
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteListing(listingId: string, employerUid: string) {
  try {
    await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).delete();
  } catch (err) {
    console.log(err);
  }
}

export async function getMyApplications(studentUid: string) {
  try {
    const appliedListings = await (await db.collection("Students").doc(studentUid).get()).data().myApplications;
    if (!appliedListings) {
      return null;
    }

    const appliedListingsData = appliedListings.map(async ({ employerUid, listingId }) => {
      const listingData = (
        await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).get()
      ).data();
      const newListingData = { ...listingData, employerUid, listingId };
      return newListingData;
    });

    const result = await Promise.all(appliedListingsData);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
