import React, { use, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../AuthModal';

const Navbar = () => {
  const [showModal, setshowModal] = React.useState(false);
  const logoSrc = "/icons/camIcon.svg";
  const avatarSrc = "/images/avatar/1.jpg";
  const menuLinks = [
    { text: "Home", href: "/" },
    { text: "My Posts", href: "/my-posts" },
    { text: "Logout", href: "#" }
  ];


  return (
    <nav className="navbar navbar-expand-lg navbar-light w-100 px-3 bg-light">
      <a className="navbar-brand" href="#">
        <img src={logoSrc} alt="logo" width="40" height="40" />
      </a>
     
      <div className="d-flex align-items-center justify-content-between w-100" >
        <ul className="navbar-nav mr-auto ">
          {menuLinks.map((link, index) => (
            <li className="nav-item mr-2" key={index}>
              <Link className="nav-link" to={link.path}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="">
        <button className="btn btn-primary" onClick={() => setshowModal(true)}>
                Login / Registrar
            </button>
        </div>
      </div>

      {showModal && <AuthModal show={showModal}  onClose={() => setshowModal(false)} />}

    </nav>
    
  );
};

export default Navbar;