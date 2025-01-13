# -----------------------
# Stage 1: Build the Next.js app
# -----------------------
FROM node:18-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["./entrypoint.sh"]

