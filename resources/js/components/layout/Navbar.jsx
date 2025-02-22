import React, { use, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../authModals/LoginModal';
import RegisterModal from '../authModals/RegisterModal';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showModalLogin, setShowModalLogin] = React.useState(false);
  const [showModalRegister, setShowModalRegister] = React.useState(false);
  const logoSrc = "/icons/camIcon.svg";
  const avatarSrc = user?.avatar ?? "/icons/avatar.svg";
  const menuLinks = [
    { text: "Home", href: "/posts/all-posts" },
  ];


  return (
    <nav className="navbar navbar-expand-lg  w-100 px-3 ">

      <div className="d-flex align-items-center justify-content-between w-100" >
        <div className=" d-flex align-items-center mr-auto ">
          <a className="navbar-brand" href="/">
        <img src={logoSrc} alt="logo" width="40"  height="40" />
</a>
          {/* {menuLinks.map((link, index) => (
            <li className=" list-unstyled" key={index}>
              <Link className="ms-2 text-decoration-none link-body-emphasis" to={link.href}>
                {link.text}
              </Link>
            </li>
          ))} */}
        </div>
        {user ? (
          <div>
          <div className=" dropdown">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="fw-semibold d-none d-sm-inline">{user.name} </span>
            <img src={avatarSrc} alt="avatar" width="32" height="32" className="rounded-circle"/>
          </a>
          <ul className="dropdown-menu text-small shadow" >
          
            <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
          </ul>
        </div>
          </div>
        ) :
          (
            <div className="">
              <button className="btn  btn-outline-dark btn-sm" onClick={() => setShowModalLogin(true)}>
                Login
              </button>
              <button className=" ms-2 btn btn-outline-primary btn-sm" onClick={() => setShowModalRegister(true)}>
                Sign Up
              </button>

            </div>)}

      </div>

      {showModalLogin && <LoginModal show={showModalLogin} handleClose={() => setShowModalLogin(false)} />}
      {showModalRegister && <RegisterModal show={showModalRegister} handleClose={() => setShowModalRegister(false)} />}

    </nav>

  );
};

export default Navbar;