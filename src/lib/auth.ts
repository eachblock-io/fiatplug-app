import axios from "axios";

// Function to fetch the token from the API route and use it RTQ fetch Authorization headers
const fetchToken = async () => {
  const data = await axios.get("/api/me");
  return data;
};
export default fetchToken;
