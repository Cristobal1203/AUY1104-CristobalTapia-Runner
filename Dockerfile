FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production-INVALID-FLAG

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/index.js"]
