import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query({
      query: ({ pageName, searchTerm, page }) => {
        console.log(pageName, searchTerm, page);
        return `${pageName}/?page=${page}&search=${searchTerm}`;
      },
    }),
    fetchItemDetails: builder.query({
      query: ({ endpoint, id }) => {
        if (!endpoint || !id) throw new Error('No endpoint');
        return `${endpoint}/${id}/`;
      },
    }),
  }),
});

export const { useFetchItemsQuery, useFetchItemDetailsQuery } = apiSlice;
