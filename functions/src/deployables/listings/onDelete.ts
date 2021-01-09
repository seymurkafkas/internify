import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onDelete = functions.firestore
  .document("Employers/{employerId}/Listings/{listingId}")
  .onDelete(async (snap, context) => {
    const { employerId, listingId } = context.params;
    const applicantsList = snap.data().applicants as string[];

    const deletionTasks = applicantsList.map(async (applicantUid) => {
      await admin
        .firestore()
        .collection("Students")
        .doc(applicantUid)
        .update({
          myApplications: admin.firestore.FieldValue.arrayRemove(listingId),
        });
    });

    try {
      await Promise.all(deletionTasks);
    } catch (err) {
      functions.logger.error("Could not delete listing references for applicants", {
        rawError: err,
        listingId: listingId,
        employerId: employerId,
      });
    }
    return null;
  });
