import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://jsonplaceholder.typicode.com";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (name: string) => `/${name}`,
    }),
    getTodo: builder.query({
      query: (combinedId: string) => `/${combinedId}`,
    }),
  }),
});

export const { useGetTodosQuery, useGetTodoQuery } = todosApi;
