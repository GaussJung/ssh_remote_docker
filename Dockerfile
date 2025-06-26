FROM node:22-alpine AS myBase

FROM myBase AS myBuilder
  RUN apk add --no-cache libc6-compat
  WORKDIR /app
  COPY package.json pnpm-lock.yaml ./
  RUN corepack enable pnpm
  RUN pnpm i --frozen-lockfile
  COPY . .
  RUN pnpm build

FROM myBase AS myRunner
  WORKDIR /app
  RUN npm install -g pm2
  COPY --from=myBuilder /app .
  EXPOSE 3000
  CMD ["pm2-runtime", "start", "ecosystem.config.js"]
