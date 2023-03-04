import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleClick = () => {
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            4Geeks Academy Login React
          </span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-dark border">
              Check the Context in action
            </button>
          </Link>
        </div>
        <form className="d-flex" role="search">
          {!store.token ? (
            <>
              <Link className="nav-link text-dark" to="/registro">
                Registrate
              </Link>
              <Link className="nav-link text-dark" to="/login">
                Inicia sesión
              </Link>
            </>
          ) : (
            <>
              <button className="btn btn-link text-dark" onClick={handleClick}>
                Cerrar sesión
              </button>
            </>
          )}
        </form>
      </div>
    </nav>
  );
};
