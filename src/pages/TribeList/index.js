import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getAllTribes } from "../../services/tribes";

import NavBar from "../../components/Navbar";
import ErrorMsg from "../../components/ErrorMsg";

const TribeList = () => {
  const [tribes, setTribes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAllTribes({ setTribes, setLoading, setError });
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div className="container">
          <div className="row">
            <ErrorMsg error={error} classes="col-12 col-xl-12" />
          </div>
          <div className="row">
            <h1 className="color-gray-700">Tribos</h1>
            <ul>
              {loading
                ? "Loading"
                : tribes.map((tribe) => {
                    return (
                      <li className="color-gray-900" key={tribe.id}>
                        <Link to={`/tribes/${tribe.id}/`}>{tribe.name}</Link>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default TribeList;
