import "../firebase/init";
import firebase from "firebase/app";

export async function setUserRole(userRole) {
  const callCloudFunction = firebase.functions().httpsCallable("setUserType");
  const result = await callCloudFunction(userRole);
  return result;
}
