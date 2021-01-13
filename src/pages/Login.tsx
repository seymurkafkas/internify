import React from "react";
import SignInForm from "../components/SignInForm";
import { useUser } from "../services/auth/userContext";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";

export default function Login() {
  const { user, loadingUser } = useUser();
  const router = useRouter();

  if (loadingUser) {
    return <div></div>;
  }

  if (user) {
    Navigation.goToHome(router);
    return <div></div>;
  }
  if (!loadingUser && !user) {
    return (
      <div className="absolute w-full h-full bg-auth-background">
        <SignInForm />
      </div>
    );
  }
}
