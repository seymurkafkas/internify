import "../firebase/init";
import firebase from "firebase";
import "firebase/firestore";
import { DateRange } from "@blueprintjs/datetime";

const db = firebase.firestore();

interface EducationItem {
  institutionName: string;
  degreeName: string;
  range: DateRange;
}

interface ExperienceItem {
  companyName: string;
  positionName: string;
  range: DateRange;
}
interface StudentProfileData {
  name: string;
  location: { city: string; country: string };
  education: EducationItem[];
  experience: ExperienceItem[];
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
        applicationCount: doc.data().applicants.length,
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
    const employerDataResponse = await db.collection("Employers").doc(userId).get();

    const result = {
      ...dataResponse.data(),
      applicationCount: dataResponse.data().applicants.length,
      companyName: employerDataResponse.data().companyName,
    };
    delete result["applicants"];
    return result;
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
    const appliedListings = (await db.collection("Students").doc(studentUid).get())?.data()?.myApplications ?? null;
    if (!appliedListings) {
      return null;
    }

    const appliedListingsData = appliedListings.map(async ({ employerUid, listingId }) => {
      const listingData = (
        await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).get()
      ).data();

      const { applicants, ...rest } = listingData;
      const newListingData = {
        ...rest,
        applicationCount: applicants.length,
        employerUid,
        listingId,
      };
      return newListingData;
    });

    const result = await Promise.all(appliedListingsData);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getEmployerListings(employerUid: string) {
  try {
    const { docs: listingDocs } = await db.collection("Employers").doc(employerUid).collection("Listings").get();
    return listingDocs.map((doc) => {
      /* eslint-disable-next-line */
      const { applicants, ...rest } = doc.data();
      return {
        ...rest,
        applicationCount: applicants.length,
        listingId: doc.id,
      };
    });
  } catch (err) {
    console.log(err);
  }
}
