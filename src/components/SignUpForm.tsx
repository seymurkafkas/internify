import React from "react";
import * as FormUtil from "../util/string";
import * as Auth from "../services/auth";
import { useRouter } from "next/router";
import { setUserRole } from "../services/functions/setUserRole";
import {
  Button,
  Callout,
  InputGroup,
  Card,
  Popover,
  Elevation,
  Radio,
  RadioGroup,
  Position,
  PopoverInteractionKind,
  Intent,
} from "@blueprintjs/core";
import styles from "./SignUpForm.module.css";
import * as Navigation from "../services/navigation";

export default function SignUpForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secondPassword, setSecondPassword] = React.useState("");
  const [userType, setUserType] = React.useState("Student");
  const router = useRouter();
  const emailIsValid = FormUtil.isEmailValid(email);
  const passwordIsValid = FormUtil.areEqual(password, secondPassword);
  const entriesAreValid = emailIsValid && passwordIsValid;
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSecondPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSecondPassword(event.target.value);
  }

  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();
    (async () => {
      try {
        await Auth.createUser(email, password);
        await setUserRole(userType);
        await Auth.signOut();
        //TEMPORARY HACK. FIX ME! OnAuthStateChanged does not get triggered unless I log out and log back in.
        Navigation.goToIndex(router);
      } catch (err) {
        console.log("Unknown Error");
      }
    })();
  }

  function handleUserTypeChange(event: React.FormEvent<HTMLInputElement>) {
    setUserType(event.currentTarget.value);
  }

  return (
    <Card
      elevation={Elevation.THREE}
      className="flex flex-col w-96 h-80 border-xl items-center justify-center space-y-4">
      <div className="text-4xl font-thin mt-4">INTERNIFY</div>
      <RadioGroup
        name="User Type"
        className="w-64 ml-20"
        inline={true}
        onChange={handleUserTypeChange}
        selectedValue={userType}>
        <Radio label="Student" value="Student" />
        <Radio label="Employer" value="Employer" />
      </RadioGroup>
      <InputGroup
        className="w-64"
        disabled={false}
        placeholder="Enter your email address..."
        small={false}
        onChange={handleEmailChange}
        value={email}
        type={"text"}
      />
      <InputGroup
        className="w-64"
        disabled={false}
        placeholder="Enter your password..."
        small={false}
        onChange={handlePasswordChange}
        value={password}
        type={"password"}
      />
      <InputGroup
        className="w-64"
        disabled={false}
        placeholder="Enter your password..."
        small={false}
        value={secondPassword}
        onChange={handleSecondPasswordChange}
        type={"password"}
      />
      <Popover
        className={styles.test}
        minimal
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.RIGHT_TOP}>
        <Button
          intent={Intent.PRIMARY}
          className="w-64"
          minimal
          icon="log-in"
          disabled={!entriesAreValid}
          onClick={handleSubmit}>
          Register
        </Button>
        {entriesAreValid || (
          <Callout
            icon="error"
            intent={Intent.WARNING}
            title={`Invalid ${emailIsValid ? "Password" : passwordIsValid ? "Email" : "Email and Password"}`}>
            {emailIsValid
              ? "Please enter a valid password"
              : passwordIsValid
              ? "Please enter a valid email"
              : "Please enter a valid email and password"}
          </Callout>
        )}
      </Popover>
    </Card>
  );
}
