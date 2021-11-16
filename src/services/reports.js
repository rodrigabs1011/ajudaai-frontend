import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers, get_or_create_token } from "../utils/core";

export class ReportService {
  constructor() {
    this.apiRef = axios.create({
      baseURL: `${BASE_API_URL}/ajudaai/v1`,
      headers,
    });
  }

  async getReports() {
    const { data } = await this.apiRef.get(`/reports/?token=${get_or_create_token()}`);
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

  async createReport(payload) {
    const { data } = await this.apiRef.post(`/reports/`, payload);
    return data;
  }

  async rateReport(id, upvote) {
    const { data } = await this.apiRef.post(`/reports/${id}/rate/`, {
      upvote,
      token: get_or_create_token(),
    });
    return data;
  }
}

export default new ReportService();
