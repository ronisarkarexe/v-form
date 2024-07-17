import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken2");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
  credentials: "include",
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Create", "Update", "Delete"],
  endpoints: () => ({}),
});
