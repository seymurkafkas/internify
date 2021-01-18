import React, { PropsWithChildren } from "react";
import {
  Menu,
  Alignment,
  Button,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { useRouter } from "next/router";
import { signOut } from "../services/auth/index";
import * as Navigation from "../services/navigation";

interface Props {}

export default function LayoutSignedInStudent(props: PropsWithChildren<Props>) {
  function handleSignOut() {
    (async () => {
      await signOut();
    })();
  }
  const router = useRouter();

  const applicationContent = (
    <Menu>
      <MenuItem
        icon="search"
        onClick={() => {
          Navigation.goToSearchPage(router);
        }}
        text="Search"
      />
      <MenuDivider />
      <MenuItem
        icon="applications"
        onClick={() => {
          Navigation.goToMyApplicationsPage(router);
        }}
        text="My Applications"
      />
    </Menu>
  );
  return (
    <>
      <Navbar className="bp3-dark">
        <NavbarGroup className="w-full h-full" align={Alignment.LEFT}>
          <NavbarHeading
            className="cursor-pointer"
            onClick={() => {
              Navigation.goToHome(router);
            }}>
            INTERNIFY
          </NavbarHeading>
          <NavbarDivider />
          <Popover content={applicationContent} minimal position={Position.TOP}>
            <Button className={Classes.MINIMAL} icon="application" text="Apply" />
          </Popover>
          <Button
            className={Classes.MINIMAL}
            onClick={() => {
              Navigation.goToProfilePage(router);
            }}
            icon="mugshot"
            text="Profile"
          />
          <NavbarDivider />
          <Button
            className={Classes.MINIMAL}
            onClick={() => {
              Navigation.goToExplorePage(router);
            }}
            icon="eye-open"
            text="Explore"
          />
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="log-out" onClick={handleSignOut} text="Sign Out"></Button>
        </NavbarGroup>
      </Navbar>
      {props.children}
    </>
  );
}
