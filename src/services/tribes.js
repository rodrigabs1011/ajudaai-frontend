import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

const getAllTribes = async ({ setTribes, setLoading, setError }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_API_URL}/api/tribes/`, {
      headers,
    });
    setTribes(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const getTribeById = async ({ id, setTribe, setLoading, setError }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_API_URL}/api/tribes/${id}/`, {
      headers,
    });
    setTribe(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const getTribeSquads = async ({ id, setSquads, setLoading, setError }) => {
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

const getTribesAndSquads = async ({ setTribesAndSquads, setLoading, setError }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_API_URL}/api/tribes/squads/`, {
      headers,
    });
    setTribesAndSquads(response.data);
  } catch (e) {
    console.log(e);
    setError(e.message);
  } finally {
    setLoading(false);
  }
}

export { getAllTribes, getTribeById, getTribeSquads, getTribesAndSquads };
