import { createApi } from '@reduxjs/toolkit/query/react';
import axiosNormalQuery from 'src/lib/axiosNormalQuery';
import { encodeQuery } from 'src/utils/encodeQuery';

export const stationsTag = 'Stations';

export interface WeatherForm {
  q: string;
  units: string;
}

export interface ForecastForm {
  q: string;
  units: string;
}

export interface WeatherDataResponse {
  name: string
  dt: number
  coord: {
    lon: number
    lat: number
  }
  main: {
    pressure: number
    humidity: number
    temp: number
  }
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
  weather: Array<{
    description: string
    icon: string
  }>
}

export interface ForecastResponse {
  dtTxt: string
  dt: number
  main: {
    pressure: number
    humidity: number
    temp: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
}

export interface ForecastDataResponse {
  list: Array<ForecastResponse>
}

export interface StationResponse {
  id: string,
  createdAt: string,
  updatedAt: string,
  externalId: string,
  name: string,
  longitude: number,
  latitude: number,
  altitude: number,
  rank: number
}

export interface StationForm {
  externalId: string,
  name: string,
  latitude: number,
  longitude: number,
  altitude: number
}

export const weatherApi = createApi({
  baseQuery: axiosNormalQuery({ baseUrl: '/' }),
  reducerPath: 'weatherApi',
  tagTypes: [stationsTag],
  endpoints: (build) => ({
    getWeatherByCityName: build.query<WeatherDataResponse, WeatherForm>({
      query: (form: WeatherForm) => ({
        url: 'data/2.5/weather',
        method: 'GET',
        params: encodeQuery(form),
      }),
    }),
    getForecastByCityName: build.query<ForecastDataResponse, ForecastForm>({
      query: (form: ForecastForm) => ({
        url: 'data/2.5/forecast',
        method: 'GET',
        params: encodeQuery(form)
      }),
    }),
    getStations: build.query<Array<StationResponse>, void>({
      query: () => ({
        url: 'data/3.0/stations',
        method: 'GET',
      }),
      providesTags: [stationsTag],
    }),
    createStation: build.mutation<void, StationForm>({
      query: (form) => ({
        url: 'data/3.0/stations',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: form,
      }),
      invalidatesTags: [stationsTag],
    }),
    deleteStation: build.mutation<void, string>({
      query: (stationId) => ({
        url: `data/3.0/stations/${stationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [stationsTag],
    })
  }),
});

export const {
  useLazyGetWeatherByCityNameQuery,
  useLazyGetForecastByCityNameQuery,
  useGetStationsQuery,
  useCreateStationMutation,
  useDeleteStationMutation,
} = weatherApi;
