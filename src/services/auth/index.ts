import "../firebase/init";

import firebase from "firebase";
import "firebase/auth";

const instance = firebase.auth();

/**
 * @param email - The user's email.
 * @param password - The user's password.
 */
export async function createUser(email: string, password: string) {
  return instance.createUserWithEmailAndPassword(email, password);
}
