# stage1 as builder
FROM node:18-alpine as builder
# change dir
WORKDIR /app
# Copy the package.json and install dependencies
COPY package*.json yarn.lock* ./
RUN yarn
# Copy rest of the files
COPY . .
# Build the project
RUN yarn build


FROM nginx:alpine as production-build
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
# Copy from the stage 1
COPY --from=builder /app/dist /app
ENTRYPOINT ["nginx", "-g", "daemon off;"]