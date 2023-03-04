import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    actions.login(email, password);
    navigate("/");
  };

  if (store.token && store.token != "" && store.token != undefined) {
    alert("Sesión Iniciada");
    navigate("/");
  }

  return (
    <>
      {store.token && store.token != "" && store.token != undefined ? (
        navigate("/")
      ) : (
        <div className="row mb-5">
          <div className="col-3"></div>
          <div className="col-6 text-center">
            <h1 className="fw-bold text-dark m-5">LOGIN</h1>
            <div className="text-center mt-5 border border-dark border-2 p-5 bg-light">
              <form>
                <div className="form-outline mb-4 fw-bold text-dark">
                  <label className="form-label" htmlFor="form2Example1">
                    Email
                  </label>
                  <input
                    className="form-control border"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <label className="form-label" htmlFor="form2Example1">
                    Password
                  </label>
                  <input
                    className="form-control border"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </form>
              <button
                className="btn btn-dark w-50 border"
                onClick={handleClick}
              >
                Iniciar Sesión
              </button>
              <h6 className="mt-4">Aún no eres miembro?</h6>
              <Link className="p-2 mb-4" to="/registro">
                Regístrate
              </Link>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      )}
    </>
  );
};