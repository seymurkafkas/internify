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

function getMatchPercentage(reference, incoming) {
  if (reference.length < 1) {
    return 50;
  }
  const seen = {};
  for (let i = 0; i < reference.length; i++) {
    seen[reference[i].skill] = -1;
  }
  for (let i = 0; i < incoming.length; i++) {
    if (seen[incoming[i].skill] === undefined) {
      continue;
    }

    console.log(i, "incoming[i].level, reference[i].level");
    console.log(incoming[i], reference[i]);

    const thatBetter = parseInt(incoming[i].level) - parseInt(reference[i].level);
    const mult = range([-2, 2], [0.5, 1.2], thatBetter);
    seen[incoming[i].skill] = mult;
  }

  //get elems which are seen
  let matchedScore = 0;
  Object.keys(seen).forEach((k) => {
    if (seen[k] != -1) {
      matchedScore += seen[k];
    }
  });

  matchedScore = range([0, 3], [0.5, 1], matchedScore);

  return matchedScore * 100;
}

function range(from, to, s) {
  return to[0] + ((s - from[0]) * (to[1] - to[0])) / (from[1] - from[0]);
}

function getListingScore(stud, ling, avgComp) {
  // compensation ortalamadan ne kadar yüksek
  const ratio = Math.abs(ling.compensation - avgComp) / avgComp;
  let compPercent = range([0.1, 1], [1, 95], ratio);
  if (ratio > 1) {
    compPercent = 95 + ratio;
  }

  //   console.log("ling.compensation, avgComp");
  //   console.log(ling.compensation, avgComp);
  //   const compPercent = Math.random() * 70 + 20;

  // requirements yüzde kaç match ediyor
  //   console.log("ling, stud");
  //   console.log(ling, stud);
  //   console.log(ling.requirements, stud.skills);
  const matchPercent = getMatchPercentage(ling.requirements, stud.skills);
  //   const matchPercent = Math.random() * 60 + 30;

  // lokasyon ne kadar yakın
  const locationBonus = stud.location.city === ling.location.city ? 1 : 0;
  //   const locationBonus = Math.abs(Math.random()) * 100;

  // ilan ne kadar süredir aktif
  const activeForPercent = range([1, 30], [100, 1], Math.random() * 29 + 1);

  // kaç kişi başvurdu
  // const appliedTimesPercent = range([1, 100], [100, 1], ling.applicants.length);
  const appllicantsPercent = range([1, 100], [100, 1], Math.random() * 99 + 1);

  //comp 30
  //matchPercent 60
  //activeFor 10
  //appliedTimes 10

  //   console.log("compPercent, matchPercent, activeForPercent, appllicantsPercent");
  //   console.log(compPercent, matchPercent, activeForPercent, appllicantsPercent);
  return (
    (compPercent * 30 + matchPercent * 60 + activeForPercent * 10 + appllicantsPercent * 10 + locationBonus * 10) / 100
  );
}

function getAverageCompensation(lings) {
  let sum = 0;
  lings.forEach((ling) => {
    sum += ling.compensation;
  });

  return sum / lings.length;
}

export async function setRecommendations() {
  const listings = await getAllListings();
  const students = await getAllStudents();

  const avgComp = getAverageCompensation(listings);

  const allRecs = [];

  students.forEach(async (stud) => {
    const recs = [];

    listings.forEach((ling) => {
      //compare them and add to recs with a score
      const score = getListingScore(stud, ling, avgComp);
      recs.push({
        score,
        listingId: ling.listingId,
        employerUid: ling.employerUid,
      });
    });

    recs.sort(function (a, b) {
      return a.score - b.score;
    });

    recs.slice(0, 3); //get top N

    allRecs.push(recs);

    //save for each student
    try {
      await saveRecommendations(recs, stud.id);
    } catch (err) {
      console.log(err);
    }
  });

  return allRecs;
}

export async function getAllStudents() {
  try {
    const studentsRef = db.collection("Students");
    const studentsSnaphot = await studentsRef.get();
    const students = [];
    studentsSnaphot.forEach(async (doc) => {
      const student = doc.data();
      students.push({
        id: doc.id,
        ...student,
      });
    });
    return students;
  } catch (err) {
    console.log(err);
  }
}

export async function saveRecommendations(recs: any, userId: string) {
  try {
    await db.collection("Students").doc(userId).set(
      {
        recommendations: recs,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);
  }
  return;
}

export async function saveStudentProfile(profileData: StudentProfileData, userId: string) {
  try {
    await db.collection("Students").doc(userId).set(profileData, { merge: true });
  } catch (err) {
    console.log(err);
  }
  return;
}

export async function getStudentProfile(userId: string) {
  try {
    const userDataResponse = await db.collection("Students").doc(userId).get();
    if (!userDataResponse.exists) {
      throw "Student Data doesnt exist";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { myApplications, ...rest } = userDataResponse.data();
    return rest as StudentProfileData;
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

export async function getMyConcludedListings(userId: string) {
  try {
    const userDataResponse = await db.collection("Employers").doc(userId).collection("ConcludedListings").get();
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
      .collection("Employers")
      .doc(employerUid)
      .collection("Listings")
      .doc(listingId)
      .update({
        applicants: firebase.firestore.FieldValue.arrayUnion(studentUid),
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
    const appliedListings = (await db.collection("Students").doc(studentUid).get())?.data()?.myApplications ?? null;
    if (!appliedListings) {
      return null;
    }

    const appliedListingsData = appliedListings.map(async ({ employerUid, listingId }) => {
      const listingData = (
        await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).get()
      ).data();

      const { applicants, ...rest } = listingData;

      const queryResult = await db.collection("Employers").doc(employerUid).get();
      const { companyName } = queryResult.data();
      const newListingData = {
        ...rest,
        applicationCount: applicants.length,
        employerUid,
        listingId,
        companyName,
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

export async function getMyApprovedApplications(studentUid: string) {
  try {
    const appliedListings =
      (await db.collection("Students").doc(studentUid).get())?.data()?.approvedApplications ?? null;
    if (!appliedListings) {
      return null;
    }

    const appliedListingsData = appliedListings.map(async ({ employerUid, listingId }) => {
      const listingData = (
        await db.collection("Employers").doc(employerUid).collection("ConcludedListings").doc(listingId).get()
      ).data();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { applicants, ...rest } = listingData;

      const queryResult = await db.collection("Employers").doc(employerUid).get();
      const { companyName } = queryResult.data(); //Also email here
      const newListingData = {
        ...rest,
        //  applicationCount: applicants.length,
        employerUid,
        listingId,
        companyName,
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

export async function getMyRejectedApplications(studentUid: string) {
  try {
    const appliedListings =
      (await db.collection("Students").doc(studentUid).get())?.data()?.rejectedApplications ?? null;
    if (!appliedListings) {
      return null;
    }

    console.log(appliedListings);
    const appliedListingsData = appliedListings.map(async ({ employerUid, listingId }) => {
      const listingData = (
        await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).get()
      ).data();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { applicants, ...rest } = listingData;

      const queryResult = await db.collection("Employers").doc(employerUid).get();
      const { companyName } = queryResult.data(); //Also email here
      const newListingData = {
        ...rest,
        //  applicationCount: applicants.length,
        employerUid,
        listingId,
        companyName,
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

export async function getAllListings() {
  try {
    const { docs: listingDocs } = await await db.collectionGroup("Listings").get();
    const ListingPromises = listingDocs.map(async (doc) => {
      /* eslint-disable-next-line */
      const { applicants, ...rest } = doc.data();
      const companyNameQuery = await doc.ref.parent.parent.get();
      const { companyName } = companyNameQuery.data();
      return {
        ...rest,
        applicationCount: applicants.length,
        listingId: doc.id,
        employerUid: doc.ref.parent.parent.id,
        companyName,
      };
    });
    return await Promise.all(ListingPromises);
  } catch (err) {
    console.log(err);
  }
}

export async function approveApplicant(employerUid: string, studentUid: string, listingId: string) {
  try {
    const dataResponse = await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).get();
    const approvedListingId = await db.collection("Employers").doc(employerUid).collection("ConcludedListings").doc();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { applicants, ...rest } = dataResponse.data();
    approvedListingId.set({ ...rest, approvedApplicant: studentUid });

    await db.collection("Employers").doc(employerUid).collection("Listings").doc(listingId).delete();

    await db
      .collection("Students")
      .doc(studentUid)
      .update({
        approvedApplications: firebase.firestore.FieldValue.arrayUnion({
          employerUid,
          listingId: approvedListingId.id,
        }),
      });
  } catch (err) {
    console.log(err);
  }
}

export async function rejectApplicant(employerUid: string, studentUid: string, listingId: string) {
  try {
    await db
      .collection("Employers")
      .doc(employerUid)
      .collection("Listings")
      .doc(listingId)
      .update({
        rejectedApplicants: firebase.firestore.FieldValue.arrayUnion(studentUid),
        applicants: firebase.firestore.FieldValue.arrayRemove(studentUid),
      });

    await db
      .collection("Students")
      .doc(studentUid)
      .update({
        myApplications: firebase.firestore.FieldValue.arrayRemove({ employerUid, listingId }),
        rejectedApplications: firebase.firestore.FieldValue.arrayUnion({ employerUid, listingId }),
      });
  } catch (err) {
    console.log(err);
  }
}
