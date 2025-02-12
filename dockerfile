FROM node:16-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .
# Expose the port the app runs on
EXPOSE 8000

CMD ["node", "app.js"]