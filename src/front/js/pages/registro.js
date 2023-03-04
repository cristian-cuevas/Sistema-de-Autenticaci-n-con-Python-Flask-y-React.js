import React, { useState, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Registro = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    actions.registro(data);
    navigate("/");
  };

  if (store.token && store.token != "" && store.token != undefined) {
    navigate("/");
  }

  return (
    <div className="text-center">
      <h1>REGISTRO</h1>
      <div className="border border-2 m-5 p-5 border-dark bg-light">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control border"
              {...register("email", {
                required: true,
                pattern:
                  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger mx-auto">El email es requerido</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control border"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger mx-auto">El password es requerido</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger mx-auto">
                La contraseña debe tener un mínimo de 8 caracteres
              </p>
            )}
          </div>
          <div className="form-check d-flex justify-content-center mb-5">
            <input
              className="form-check-input me-2 borde"
              type="checkbox"
              id="form2Example3c12"
              {...register("checked")}
            />
            <label className="form-check-label" htmlFor="form2Example32">
              Confirmo y acepto los Términos y condiciones
            </label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-dark border">
              Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};