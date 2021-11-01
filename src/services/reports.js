import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

const axiosClient = axios.create({
  baseURL: `${BASE_API_URL}/api/`,
  headers,
});

export class ReportService {
  constructor() {
    this.apiRef = axios.create({
      baseURL: `${BASE_API_URL}/ajudaai/v1`,
      headers,
    });
  }

  async getReports() {
    const { data } = await this.apiRef.get(`/reports/`);
    return data;
  }

  async getReportById(id) {
    const { data } = await this.apiRef.get(`/reports/${id}/`);
    return data;
  }

  async getSimilarReports(payload) {
    // const { data } = await this.apiRef.get(`/reports/findRelated/?description=${payload.description}`);
    // const { data } = await this.apiRef.post(`/reports/findRelated/`, payload);
    const { data } = await this.apiRef.get(`/reports/`);
    return data.slice(0, 3);
  }

  // async editSquad(id, payload) {
  //   const { data } = await this.apiRef.patch(`${BASE_API_URL}/api/squads/${id}/`, payload);
  //   return data;
  // }
}

const getSquadById = async ({ id, setSquad, setLoading, setError }) => {
  try {
    setLoading(true);
    const response = await axiosClient.get(`${BASE_API_URL}/api/squads/${id}/`);
    setSquad(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const getSquadRoles = async ({ id, setSquadUsers, setLoading, setError }) => {
  try {
    setLoading(true);
    const response = await axiosClient.get(
      `${BASE_API_URL}/api/squads/${id}/users/`
    );
    setSquadUsers(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const getSquadPermissions = async ({
  id,
  setSquadPermissions,
  setLoading,
  setError,
}) => {
  try {
    setLoading(true);
    const response = await axiosClient.get(
      `${BASE_API_URL}/api/squads/${id}/permissions/`
    );
    setSquadPermissions(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const getSquadAndTribe = async ({
  id,
  setSquadAndTribe,
  setLoading,
  setError,
}) => {
  try {
    setLoading(true);
    const response = await axiosClient.get(
      `${BASE_API_URL}/api/squads/${id}/tribe/`
    );
    setSquadAndTribe(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const addSquadMember = async ({
  payload,
  setResponse,
  setLoading,
  setError,
}) => {
  try {
    setLoading(true);
    const response = await axiosClient.post(
      `${BASE_API_URL}/api/squad-roles/`,
      payload
    );
    setResponse(response);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

const deleteSquad = async ({ data, id }) => {
  const response = await axiosClient.delete(
    `${BASE_API_URL}/api/squads/${id}/`
  );
  return response;
};


export {
  getSquadById,
  getSquadRoles,
  getSquadPermissions,
  getSquadAndTribe,
  addSquadMember,
  deleteSquad,
};


export default new ReportService();
