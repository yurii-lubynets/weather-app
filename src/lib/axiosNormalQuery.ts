import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { appId } from 'src/constants';
import axiosNormal from 'src/lib/axiosNormal';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
  {
    url?: string;
    method: AxiosRequestConfig['method'];
    body?: AxiosRequestConfig['data'];
    headers?: AxiosRequestConfig['headers'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
  > => async ({ url = '', method, body, headers, params }) => {
    try {
      const result = await axiosNormal({
        url: baseUrl + url,
        method,
        data: body,
        headers,
        params: {
          appid: appId,
          ...params,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default axiosBaseQuery;
