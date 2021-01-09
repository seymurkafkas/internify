import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onDelete = functions.firestore
  .document("Employers/{employerUid}/Listings/{listingId}")
  .onDelete(async (snap, context) => {
    const { employerUid, listingId } = context.params;
    const applicantsList = snap.data().applicants as string[];

    const deletionTasks = applicantsList.map(async (applicantUid) => {
      await admin
        .firestore()
        .collection("Students")
        .doc(applicantUid)
        .update({
          myApplications: admin.firestore.FieldValue.arrayRemove({
            employerUid,
            listingId,
          }),
        });
    });

    try {
      await Promise.all(deletionTasks);

      functions.logger.log("Successfully deleted references for applicants.");
    } catch (err) {
      functions.logger.error("Could not delete listing references for applicants", {
        rawError: err,
        listingId,
        employerUid,
      });
    }
    return null;
  });
