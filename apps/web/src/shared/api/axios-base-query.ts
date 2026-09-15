import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { type AxiosRequestConfig } from 'axios';

import { env } from '@/shared/config';

// body и params типизированы как unknown, а не any из AxiosRequestConfig, чтобы any не
// расползался по коду.
export interface AxiosBaseQueryArgs {
  readonly url: string;
  readonly method?: AxiosRequestConfig['method'];
  readonly body?: unknown;
  readonly params?: Record<string, unknown>;
  readonly headers?: Record<string, string>;
}

export interface AxiosBaseQueryError {
  /** Нет, если ответа от сервера не было. */
  readonly status?: number;
  readonly data: unknown;
}

// withCredentials нужен, чтобы ходили HttpOnly-cookie авторизации.
const client = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
});

// На refresh получили бы рекурсию, а 401 на login означает неверный пароль, а не
// истёкший токен.
const NO_REFRESH_URLS = ['/auth/refresh', '/auth/login'];

// Параллельные 401 ждут один общий refresh. Если каждый запустит свой, бэкенд
// ротирует токены несколько раз и сессия развалится.
let refreshInFlight: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  refreshInFlight ??= client
    .post('/auth/refresh')
    .then(() => true)
    .catch(() => false)
    .finally(() => {
      refreshInFlight = null;
    });
  return refreshInFlight;
}

/**
 * Access-токен живёт 15 минут, так что после паузы запрос получает 401. В этом случае
 * один раз обновляем сессию и повторяем запрос, чтобы не разлогинивать на ровном месте.
 */
export function axiosBaseQuery(): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> {
  return async (args) => {
    const first = await request(args);
    if (!isUnauthorized(first) || NO_REFRESH_URLS.includes(args.url)) {
      return first;
    }

    const refreshed = await refreshSession();
    return refreshed ? request(args) : first;
  };
}

type QueryResult = { data: unknown } | { error: AxiosBaseQueryError };

async function request({
  url,
  method = 'GET',
  body,
  params,
  headers,
}: AxiosBaseQueryArgs): Promise<QueryResult> {
  try {
    const { data } = await client.request<unknown>({ url, method, data: body, params, headers });
    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: { status: error.response?.status, data: error.response?.data ?? error.message },
      };
    }
    return { error: { data: error instanceof Error ? error.message : 'Unknown network error' } };
  }
}

function isUnauthorized(result: QueryResult): boolean {
  return 'error' in result && result.error.status === 401;
}
