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

interface Props {}

export default function LayoutSignedInEmployer(props: PropsWithChildren<Props>) {
  function handleSignOut() {}
  const settings = (
    <Menu>
      <MenuItem icon="settings" text="Settings" />
      <MenuDivider />
      <MenuItem icon="log-out" onClick={handleSignOut} text="Sign Out" />
    </Menu>
  );

  const applicationContent = (
    <Menu>
      <MenuItem icon="add" onClick={() => {}} text="Post a Listing" />
      <MenuDivider />
      <MenuItem icon="applications" onClick={() => {}} text="My Listings" />
    </Menu>
  );
  return (
    <>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>INTERNIFY</NavbarHeading>
          <NavbarDivider />
          <Popover content={applicationContent} minimal position={Position.TOP}>
            <Button className={Classes.MINIMAL} icon="application" text="Listings" />
          </Popover>
          <Button className={Classes.MINIMAL} icon="people" text="Applicants" />
          <Button className={Classes.MINIMAL} icon="mugshot" text="Profile" />
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="eye-open" text="Explore" />
          <NavbarDivider />
          <Popover content={settings} minimal position={Position.TOP}>
            <Button icon="cog" text="" minimal />
          </Popover>
        </NavbarGroup>
      </Navbar>
      {props.children}
    </>
  );
}
