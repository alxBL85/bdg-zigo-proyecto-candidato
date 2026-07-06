FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

RUN npm run build

ENV NODE_ENV=production \
    PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start"]
