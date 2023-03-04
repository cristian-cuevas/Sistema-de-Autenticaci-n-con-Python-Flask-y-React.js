import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  return (
    <>
      {store.token && store.token != "" && store.token != undefined ? (
        <>
          <div className="text-center">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6 mt-1 p-2">
                <h3 className="mb-2 p-1">
                  Implementación de la autenticación JWT
                </h3>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/8-W2O_R95Pk"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="col-3 mb-3"></div>
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
};