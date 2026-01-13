import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../types/user.type";
import { API_BASE_URL } from "../config/apiConfig";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
