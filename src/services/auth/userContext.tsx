import { useState, useEffect, createContext, useContext, PropsWithChildren } from "react";
import "../firebase/init";
import firebase from "firebase/app";
import "firebase/auth";
import { goToIndex } from "../navigation";
import { useRouter } from "next/router";

export const UserContext = createContext({ user: null, setUser: null, loadingUser: true });

interface Props {}

export default function UserProvider(props: PropsWithChildren<Props>) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const router = useRouter();

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL });
        } else {
          setUser(null);
          setLoadingUser(false);
          goToIndex(router);
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserContext.Provider value={{ user, setUser, loadingUser }}>{props.children}</UserContext.Provider>;
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
