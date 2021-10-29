import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { BASE_API_URL } from "../../utils/urls"
import { headers } from "../../utils/core";

import NavBar from "../../components/Navbar";
import ErrorMsg from "../../components/ErrorMsg";

const TribeDetail = () => {
  const [tribe, setTribe] = useState({});
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();

  const fetchTribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URL}/api/tribes/${id}`, {
        headers,
      });
      setTribe(response.data);
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchSquads = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URL}/api/tribes/${id}/squads/`, {
        headers,
      });
      setSquads(response.data);
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTribe();
    fetchSquads(); // eslint-disable-next-line
  }, []);


  return (
    <>
      <NavBar />
      <main>
        <div className="container">
          <div className="row">
            <ErrorMsg error={error} />
          </div>
          <div className="row">
            <h1 className="color-gray-700">{loading ? "loading" : tribe.name}</h1>
              {squads.length === 0 ? "Nenhuma Squad" : null}
              <ul>
                {loading
                  ? "Loading"
                  : squads.map((squad) => {
                      return (
                        <li className="color-gray-900" key={squad.id}>
                          <Link to={`/squads/${squad.id}/`}>{squad.name}</Link>
                        </li>
                      );
                    })}
              </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default TribeDetail;
