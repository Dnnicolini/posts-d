import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const logoSrc = "/icons/camIcon.svg";
  const avatarSrc = "/images/avatar/1.jpg";
  const menuLinks = [
    { text: "Home", href: "/" },
    { text: "My Posts", href: "/my-posts" },
    { text: "Logout", href: "#" }
  ]
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3 bg-light">
      <a className="navbar-brand" href="#">
        <img src='/icons/camIcon.svg' alt="logo" width="40" height="40" />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ">
          {menuLinks.map((link, index) => (
            <li className="nav-item mr-2" key={index}>
              <Link className="nav-link" to={link.path}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;