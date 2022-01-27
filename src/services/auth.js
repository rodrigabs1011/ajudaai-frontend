import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

export class AuthService {
  constructor() {
    this.apiRef = axios.create({
      baseURL: `${BASE_API_URL}`,
      headers,
    });
  }

  async signin(payload) {
    const { data } = await this.apiRef.post(`/ajudaai/token/login`, payload);
    return data;
  }
}

export default new AuthService();
