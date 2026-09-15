# Собирается из корня монорепозитория:
#   docker build -f apps/web/Dockerfile -t portfolio-web .

FROM node:22-bookworm-slim AS build
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /app

# Нужны манифесты всех пакетов воркспейса, иначе --frozen-lockfile падает на
# отсутствующем package.json.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/contract/package.json packages/contract/
COPY packages/ui-kit/package.json packages/ui-kit/

RUN pnpm install --frozen-lockfile --filter "@portfolio/web..."

# VITE_ENABLE_MOCKS не задан, так что MSW в бандл не попадёт.
COPY apps/web apps/web
COPY packages/contract packages/contract
COPY packages/ui-kit packages/ui-kit
# Фронт типизируется от контракта, поэтому контракт собираем первым.
RUN pnpm --filter @portfolio/contract build \
  && pnpm --filter @portfolio/web build

# Caddy раздаёт статику и проксирует API
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/apps/web/dist /srv
