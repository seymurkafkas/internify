import React from "react";
import * as FormUtil from "../util/string";
import * as Auth from "../services/auth";
import { Button, InputGroup, Intent, Card, Elevation, Tooltip } from "@blueprintjs/core";
import { useUser } from "../services/auth/userContext";
import { useRouter } from "next/router";
import * as Navigation from "../services/navigation";
import { AppToaster } from "../components/Toaster";

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  const showSignInToaster = () => {
    AppToaster.show({
      message: "Incorrect Password or E-Mail. Please try again.",
      icon: "warning-sign",
      intent: Intent.DANGER,
    });
  };

  function handleIncorrectPassword() {
    showSignInToaster();
    setPassword("");
  }

  if (user) {
    Navigation.goToHome(router);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: React.MouseEvent) {
    if (!emailIsValid || password === "") {
      showSignInToaster();
    } else {
      event.preventDefault();

      (async () => {
        try {
          const userResponse = await Auth.logIn(email, password);
          setUser(userResponse);
          await Navigation.goToHome(router);
        } catch (err) {
          handleIncorrectPassword();
        }
      })();
    }
  }

  const emailIsValid = FormUtil.isEmailValid(email);
  function handleLockClick() {
    setShowPassword(!showPassword);
  }

  const lockButton = (
    <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={false}>
      <Button
        disabled={false}
        icon={showPassword ? "unlock" : "lock"}
        intent={Intent.WARNING}
        minimal={true}
        onClick={handleLockClick}
      />
    </Tooltip>
  );

  return (
    <Card
      elevation={Elevation.THREE}
      className="flex flex-col w-96 h-64 border-xl items-center justify-center space-y-4">
      <div className="text-4xl font-thin mb-4">INTERNIFY</div>
      <InputGroup
        className="w-64"
        disabled={false}
        fill={false}
        placeholder="Enter your email address..."
        onChange={handleEmailChange}
        value={email}
        type={"text"}
      />
      <InputGroup
        className="w-64"
        disabled={false}
        placeholder="Enter your password..."
        rightElement={lockButton}
        onChange={handlePasswordChange}
        value={password}
        type={showPassword ? "text" : "password"}
      />
      <div
        className="cursor-pointer flex place-items-center rounded justify-center text-white bg-indigo-800 hover:bg-indigo-600 w-64 h-10"
        onClick={handleSubmit}>
        <div className="text-lg">Login</div>
      </div>
    </Card>
  );
}
