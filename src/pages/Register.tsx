import React from "react";
import SignUpForm from "../components/SignUpForm";
import { useUser } from "../services/auth/userContext";
import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";

export default function Register() {
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
        <SignUpForm />
      </div>
    );
  }
}
