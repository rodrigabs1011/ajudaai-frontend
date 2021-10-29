import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

const getRoles = async ({ setRoles, setLoading, setError }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${BASE_API_URL}/api/roles/`, {
      headers,
    });
    setRoles(response.data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

export { getRoles };
