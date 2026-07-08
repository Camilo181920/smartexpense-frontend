# ---------- Build Stage ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build argument
ARG VITE_API_URL

# Environment variable used by Vite during build
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# ---------- Production Stage ----------
FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]