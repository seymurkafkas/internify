import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const setUserType = functions.https.onCall(async (data, context) => {
  try {
    await admin.auth().setCustomUserClaims(context.auth.uid, { userType: data });
    return true;
  } catch (err) {
    console.log(err);
  }
});
