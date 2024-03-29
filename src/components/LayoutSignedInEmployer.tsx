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
import * as Navigation from "../services/navigation";
import { signOut } from "../services/auth/index";

interface Props {}

export default function LayoutSignedInEmployer(props: PropsWithChildren<Props>) {
  const router = useRouter();

  function handleSignOut() {
    (async () => {
      await signOut();
    })();
  }

  const applicationContent = (
    <Menu>
      <MenuItem
        icon="add"
        onClick={() => {
          Navigation.goToPostAListingPage(router);
        }}
        text="Post a Listing"
      />
      <MenuDivider />
      <MenuItem
        icon="applications"
        onClick={() => {
          Navigation.goToMyListingsPage(router);
        }}
        text="My Listings"
      />
    </Menu>
  );
  return (
    <>
      <Navbar className="bp3-dark">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading
            className="cursor-pointer"
            onClick={() => {
              Navigation.goToHome(router);
            }}>
            INTERNIFY
          </NavbarHeading>
          <NavbarDivider />
          <Popover content={applicationContent} minimal position={Position.TOP}>
            <Button className={Classes.MINIMAL} icon="application" text="Listings" />
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
          <Button className={Classes.MINIMAL} icon="log-out" onClick={handleSignOut} text="Sign Out"></Button>
        </NavbarGroup>
      </Navbar>
      {props.children}
    </>
  );
}
