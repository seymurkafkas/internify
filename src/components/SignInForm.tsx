import React from "react";
import * as FormUtil from "../util/string";
import * as Auth from "../services/auth";
import styles from "./SignInForm.module.css";
import { Button, InputGroup, Intent, Card, Elevation, Tooltip } from "@blueprintjs/core";

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();

    (async () => {
      try {
        await Auth.logIn(email, password);
        console.log("Success");
      } catch (err) {
        console.log("Unknown Error");
      }
    })();
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
    <Card elevation={Elevation.THREE} className={styles.logInBox}>
      <InputGroup
        disabled={false}
        fill={false}
        placeholder="Enter your email address..."
        onChange={handleEmailChange}
        value={email}
        type={"text"}
      />
      <InputGroup
        className={styles.inside}
        disabled={false}
        placeholder="Enter your password..."
        rightElement={lockButton}
        onChange={handlePasswordChange}
        value={password}
        type={showPassword ? "text" : "password"}
      />
      <Button
        className={styles.inside}
        minimal
        value="Sign In"
        icon="log-in"
        intent={Intent.PRIMARY}
        disabled={!emailIsValid || password === ""}
        onClick={handleSubmit}>
        Login
      </Button>
    </Card>
  );
}
