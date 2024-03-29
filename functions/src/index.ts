import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as listingsTriggers from "./deployables/listings";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const setUserType = functions.https.onCall(async (data, context) => {
  const userId = context?.auth?.uid ?? null;
  if (userId) {
    try {
      await admin.auth().setCustomUserClaims(userId, { userType: data });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
});

export const listingDocOnDelete = listingsTriggers.onDelete;
