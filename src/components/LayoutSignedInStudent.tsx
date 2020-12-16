import React from "react";
import PropTypes from "prop-types";
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

export default function LayoutSignedIn(props) {
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
      <MenuItem icon="search" onClick={() => {}} text="Search" />
      <MenuDivider />
      <MenuItem icon="applications" onClick={() => {}} text="My Applications" />
    </Menu>
  );
  return (
    <>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>INTERNIFY</NavbarHeading>
          <NavbarDivider />
          <Popover content={applicationContent} minimal position={Position.TOP}>
            <Button className={Classes.MINIMAL} icon="application" text="Apply" />
          </Popover>
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

LayoutSignedIn.propTypes = {
  children: PropTypes.element.isRequired,
};
