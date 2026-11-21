FROM node:22-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json ./
RUN npm install

FROM base AS development
ENV NODE_ENV=development
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
