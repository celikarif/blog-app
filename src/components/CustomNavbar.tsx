import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

interface NavbarProps {
  brandName: string;
  links: Array<{ label: string; href: string }>;
  children?: React.ReactNode;
}

const CustomNavbar: React.FC<NavbarProps> = ({ brandName, links, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="custom-navbar" light expand="md">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          {brandName}
        </a>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {links.map((link, index) => (
              <NavItem key={index}>
                <NavLink href={link.href} className="navbar-link">
                  {link.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          {children && <div>{children}</div>}
        </Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;
