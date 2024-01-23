import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetchToken from "@/lib/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: "include", // this will send back our http only secure cookie, so the cookie will be send with every query.
    prepareHeaders: async (headers) => {
      const token = await fetchToken(); // Fetch the token using the utility function
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", `application/json`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
