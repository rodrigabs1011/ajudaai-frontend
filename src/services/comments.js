
import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

export class CommentsService {
  constructor() {
    this.apiRef = axios.create({
      baseURL: `${BASE_API_URL}/ajudaai/v1`,
      headers,
    });
  }

  async addCommentary(payload) {
    const { data } = await this.apiRef.post(`/comments/`, payload);
    return data;
  }
}

export default new CommentsService();
