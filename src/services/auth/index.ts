import "../firebase/init";
import firebase from "firebase";
import "firebase/auth";

const instance = firebase.auth();

/**
 * @param email - The user's email.
 * @param password - The user's password.
 */
export async function createUser(email: string, password: string) {
  return await instance.createUserWithEmailAndPassword(email, password);
}

export async function logIn(email: string, password: string) {
  return await instance.signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  return await instance.signOut();
}
