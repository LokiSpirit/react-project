/* import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query({
      query: ({ pageName, searchTerm, page }) => {
        return `${pageName}/?page=${page}&search=${searchTerm ? searchTerm : ''}`;
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

export const { useFetchItemsQuery, useFetchItemDetailsQuery } = apiSlice; */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Result } from '../../components/result-component/ResultsComponent';

export interface FetchItemsResponse {
  data: { count: number; results: Result[] };
  isLoading: boolean;
  isError: boolean;
}

interface FetchItemsQueryArgs {
  pageName: string;
  searchTerm?: string;
  page: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query<FetchItemsResponse, FetchItemsQueryArgs>({
      query: ({ pageName, searchTerm, page }) => {
        return `${pageName}/?page=${page}&search=${searchTerm ? searchTerm : ''}`;
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
