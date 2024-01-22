import { apiSlice } from "../apiSlice";



export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: {
    mutation: (arg0: {
      query: (credentials: any) => { url: string; method: string; body: any };
    }) => any;
  }) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
