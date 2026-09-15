# Собирается из корня монорепозитория:
#   docker build -f apps/api/Dockerfile -t portfolio-api .

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
# В slim-образе нет libssl, а без него движок Prisma может отказаться выполнять запросы.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable
WORKDIR /app

FROM base AS build

# Манифесты копируем отдельно, чтобы слой с установкой зависимостей кэшировался.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/contract/package.json packages/contract/
COPY packages/ui-kit/package.json packages/ui-kit/

# web в этот образ не входит, ставим зависимости только для api и contract.
RUN pnpm install --frozen-lockfile --filter "@portfolio/api..." --filter "@portfolio/contract..."

COPY apps/api apps/api
COPY packages/contract packages/contract
RUN pnpm --filter @portfolio/contract build \
  && pnpm --filter @portfolio/api prisma:generate \
  && pnpm --filter @portfolio/api build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
# Загрузки живут на отдельном томе, чтобы не пропадать при обновлении образа.
ENV UPLOAD_DIR=/data/uploads

# Копируем workspace целиком: pnpm держит зависимости на симлинках, а prisma CLI
# нужен на старте для migrate deploy.
COPY --from=build /app /app
WORKDIR /app/apps/api

RUN mkdir -p /data/uploads
EXPOSE 3000

# nest build сохраняет структуру src/, поэтому точка входа лежит в dist/src.
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && node dist/src/main"]
