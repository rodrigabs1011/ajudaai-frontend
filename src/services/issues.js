import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers, get_or_create_token } from "../utils/core";

export class IssuesService {
  constructor() {
    this.apiRef = axios.create({
      baseURL: `${BASE_API_URL}/ajudaai/v1`,
      headers,
    });
  }

  async getAllIssues() {
    const { data } = await this.apiRef.get(`/issues/?token=${get_or_create_token()}`);
    return data;
  }

  async getIssueById(id) {
    const { data } = await this.apiRef.get(`/issues/${id}/?token=${get_or_create_token()}`);
    return data;
  }

  async getSimilarIssues(payload) {
    // const { data } = await this.apiRef.get(`/issues/findRelated/?description=${payload.description}`);
    // const { data } = await this.apiRef.post(`/issues/findRelated/`, payload);
    const { data } = await this.apiRef.get(`/issues/`);
    return data.slice(0, 3);
  }

  async addIssue(payload) {
    const { data } = await this.apiRef.post(`/issues/`, payload);
    return data;
  }

  async rateIssue(id, upvote) {
    const { data } = await this.apiRef.post(`/issues/${id}/rate/`, {
      upvote,
      token: get_or_create_token(),
    });
    return data;
  }

  async getIssueComments(id) {
    const { data } = await this.apiRef.get(`/issues/${id}/comments/?token=${get_or_create_token()}`);
    return data;
  }
}

export default new IssuesService();
